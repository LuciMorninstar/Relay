import Message from "../models/message.model.js";
import User from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const getMyChatFriends = async(req,res,next)=>{

    const myId = req.user._id;

    try {

        if(!myId){
            const err = new Error("No id provided");
            err.statusCode = 400;
            return next(err);
        }

        const messages = await Message.find({
            $or:[
                {senderId:myId},
                {receiverId:myId},
                
            ]
        })

        // now to get the ids of the users that have a conversation with me

        const myChatFriendIds =[...new Set( messages.map((message)=>
            message.senderId === myId ? message.receiverId :message.receiverId
        ))];

        // new set help to remove duplicates and ids will have array container to hold ids and spread the values

        const chatFriends = await User.find({_id:{$in:myChatFriendIds}}).select(-"password");

        return res.status(200).json({
            success:true,
            chatFriends:chatFriends
        })

        
    } catch (error) {
        console.log("Erorr in getMyChats controller", error.message);
        next(error);
        
    }


}


export const sendMessage = async(req,res,next)=>{

    const myId = req.user._id;
    const {id:receiverId} = req.params;
    const text = req.body?.text || "";
    

    try {
        if(!myId || !receiverId){
            const err = new Error("No id provided to send message");
            err.statusCode = 400;
            return next(err);
        }

        let imageUrls = [];
        let videoUrls = [];

        const imagePaths = req.files?.image?.length >0 ? await uploadOnCloudinary(req.files?.image?.map((img)=>img.path)):[];

        imageUrls = imagePaths.map((imagePath)=>{
            return {
                url:imagePath.url,
                public_id:imagePath.public_id
            }
        })

        const videoPaths = req.files?.video?.length>0 ? await uploadOnCloudinary(req.files?.video?.map((vid)=>vid.path)):[];

        videoUrls = videoPaths.map((videoPath)=>{
            return {
                url:videoPath.url,
                public_id:videoPath.public_id
            }
        })

        const message = await Message.create({
            senderId:myId,
            receiverId:receiverId,
            text:text,
            image:imageUrls,
            video:videoUrls,


        })

        return res.status(201).json({
            success:true,
            message:message
        })
    
        


    


        
        
    } catch (error) {
        console.log("Error in the sendMessage controller", error.message);
        next(error);
        
    }



}


export const getAllUsers = async(req,res,next)=>{

    const myId = req.user._id;

    try {

        if(!myId){
            const err = new Error("No id provided");
            err.statusCode = 400;
            return next(err);
        }

        const users = await User.find({_id:{$ne:myId}}).select("-password");

        return res.status(200).json({
            success:true,
            users:users
        })
        
    } catch (error) {
        console.log("Error in getAllUsers controller", error.message);
        next(error);
        
    }
}

export const getMessagesById = async(req,res,next)=>{
    const myId = req.user._id;
    const {id:receiverId} = req.params;

    try {
        if(!myId || !receiverId){
            const err = new Error("No id provided");
            err.statusCode = 400;
            return next(err);
        }

        const messages = await Message.find({
            $or:[
                {senderId:myId, receiverId:receiverId},
                {senderId:receiverId, receiverIdmyId}
            ]
        });

        return res.status(200).json({
            success:true,
            messages:messages
        })
        
    } catch (error) {

        console.log("Error in getMessagesById controller", error.message);
        next(error);
        
    }

}