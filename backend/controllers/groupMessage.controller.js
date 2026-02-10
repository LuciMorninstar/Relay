import Group from "../models/group.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const getAllGroups = async(req,res,next)=>{

    try {
        const groups = await Group.find();

        if(!groups){
            const err = new Error("No groups found");
            err.statusCode = 400;
            return next(err);
        }

        return res.status(200).json({
            success:true,
            groups:groups
        });
        
    } catch (error) {
        console.log("Error in getAllGroups controller", error.message);
        next(error);
        
    }

}

export const createGroup = async(req,res,next)=>{

    const myId = req.user._id;
    const {groupName} = req.body;


    try {
        if(!myId){
            const err = new Error("No Id provided");
            err.statusCode = 400;
            return next(err);
        }

        if(!groupName){
            const err = new Error("Group name is required");
            err.statusCode = 400;
            return next(err);
        }

        let groupPicUrl = {
            url:null,
            public_id:null
        }

        if(req.files && req.files?.groupPic?.length >0){
            const groupPicPath = req.files.groupPic[0].path;
            const upload = await uploadOnCloudinary(groupPicPath);
            groupPicUrl = {
                url:upload.url,
                public_id:upload.public_id
            }
        }

        const group = await Group.create({
            groupName:groupName,
            groupPic:groupPicUrl,
            groupAdmins:[myId],
            groupMembers:[myId]
        })

        return res.status(200).json({
            success:true,
            group:group
        });

        
    } catch (error) {
        console.log("Error in createGroup controller", error.message);
        next(error);
        
    }


    
}

export const addMembersToGroup = async(req,res,next)=>{

    const members = req.body?.members;
    const groupId = req.params.groupId;
    const myId = req.user._id;

    try {

          if(!groupId){
            const err = new Error("No group id provided");
            err.statusCode = 400;
            return next(err);
        }

        if(!members){
            const err = new Error("No members provided");
            err.statusCode = 400;
            return next(err);
        }

        const group = await Group.findById(groupId);

        if(!group){
            const err = new Error("No group found");
            err.statusCode = 404;
            return next(err);
        }

        if(!group.groupAdmins.includes(myId.toString())){
            const err = new Error("You are not an admin of this group");
            err.statusCode = 401;
            return next(err);
        }

        const newMembers = members.filter(member=>!group.groupMembers.includes(member));
        group.groupMembers.push(...newMembers);

        await group.save();

//         can do this as well 
//         await Group.findByIdAndUpdate(
//     groupId,
//     { $addToSet: { groupMembers: { $each: members } } },
//     { new: true }
// );

        return res.status(200).json({
            success:true,
            message:"Members added successfully"
        })

   

      

    } catch (error) {
        console.log("Error in addMembersToGroup controller", error.message);
        next(error);
        
    }
}

