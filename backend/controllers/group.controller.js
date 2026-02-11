
import Group from "../models/group.model.js";
import User from "../models/user.model.js";
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


export const updateGroupInfo = async(req,res,next)=>{

    const {groupId} = req.params;
    const {groupName} = req.body;
    const myId = req.user._id;

    try {

        const group = await Group.findById(groupId);

        if(!group){
            const err = new Error("No group found");
            err.statusCode = 404;
            return next(err);
        }

        const isAdminOfGroup = group.groupAdmins.some(adminId =>
            adminId.equals(myId)
        )

        if(!isAdminOfGroup){
            const err = new Error("You are not an admin of this group");
            err.statusCode = 401;
            return next(err);
        }

       
           let updateData = {};
           
            if(groupName){
                updateData.groupName = groupName;
            }

        if(req.files && req.files?.groupPic?.length >0){
            const groupPicPath = req.files.groupPic[0].path;
            const upload = await uploadOnCloudinary(groupPicPath);

            updateData.groupPic = {
                url:upload.url,
                public_id:upload.public_id
            }
          
        }

       const updatedGroup = await Group.findByIdAndUpdate(groupId,updateData, {new:true});

        return res.status(200).json({
            success:true,
            group:updatedGroup
        })         

        
    } catch (error) {
        console.log("Error in updateGroupInfo controller", error.message);
        next(error);
        
    }

}

export const addAsAdmin = async(req,res,next)=>{

    const {newAdminIds} = req.body;
    const myId = req.user._id;
    const groupId = req.params.groupId;

    try {

        
    if (!Array.isArray(newAdminIds) || newAdminIds.length === 0) {
      const err = new Error("Please provide valid admin IDs (an array)");
      err.statusCode = 400;
      return next(err);
    }

  const updatedGroup = await Group.findOneAndUpdate({_id:groupId,groupAdmins:myId}, {$addToSet:{groupAdmins:{$each:newAdminIds}}},{new:true});

  if(!updatedGroup){
    const err = new Error("Either you are not an admin or the group does not exist");
    err.statusCode = 401;
    return next(err);
  }

  return res.status(200).json({
    success:true,
    message:"Admins added successfully",
    admins:updatedGroup.groupAdmins
  })

  
        
    } catch (error) {
        console.log("Error in addAsAdmin controller", error.message);
        next(error);
        
    }

}

export const sendMessageToGroup = async(req,res,next)=>{

    const {text} = req.body;
    const myId = req.user?._id;
    const groupId = req.params.groupId;

    try {

        const group = await Group.findOne({_id:groupId,groupMembers:myId});

        if(!group){
            const err = new Error("You are not an admin of this group or group not found");
            err.statusCode = 401;
            return next(err);
        }


        let imagePathUrls;
        let videoPathUrls;

      const imagePaths = req.files?.image?.length > 0 ? await uploadOnCloudinary(req.files?.image?.map((img)=>img.path)):[] ;

      imagePathUrls = imagePaths.map((imagePath)=>{
        return {
            url:imagePath.url,
            public_id:imagePath.public_id
        }
      })

      const videoPaths = req.files?.video?.length >0 ? await uploadOnCloudinary(req.files?.video?.map((vid)=>vid.path)):[];

      videoPathUrls = videoPaths.map((videoPath)=>{
        return {
            url:videoPath.url,
            public_id:videoPath.public_id
        }
      })

      const message = await Message.create({
        senderId:myId,
        text:text ? text:null,
        image:imagePathUrls,
        video:videoPathUrls,
        groupId:groupId

      })

      await Group.findByIdAndUpdate(groupId,{$push:{groupMessages:message._id}});

      return res.status(201).json({
        success:true,
        message:message,
  
      })

    

        
    } catch (error) {
        console.log("Error in sendMessageToGroup controller", error.message);
        next(error);
        
    }


    

}

export const getGroupMessages = async(req,res,next)=>{

    const {groupId} = req.params;
    const myId = req.user?._id;

    try {

        const group = await Group.findOne({_id:groupId}).populate("groupMessages");

        if(!group){
            const err = new Error("Group not found");
            err.statusCode = 404;
            return next(err);
        }

        if(!group.groupMembers.includes(myId)){
            const err = new Error("You are not a member of this group");
            err.statusCode = 401;
            return next(err);
        }


        return res.status(200).json({
            success:true,
            messages:group.groupMessages
        })

    }

        
     catch (error) {
        console.log("Error in getGroupMessages controller", error.message);
        next(error);
        
    }



}







//  removeAdmin, removeMembers, deleteGroup, getGroupByName, getGroupMessages with each senderId or name