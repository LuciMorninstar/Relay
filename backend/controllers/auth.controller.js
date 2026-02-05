import User from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { generateTokens,storeRefreshTokenInRedis,setCookies } from "../utils/authReq.js";

export const signUp = async(req,res,next)=>{

    const {fullName,email, password} = req.body;

   try {
       if(!fullName || !email || !password){
        const err = new Error("All fields are required");
        err.statusCode = 400;
        return next(err);
    }

    const existingUser = await User.findOne({email});

    if(existingUser){
        const err = new Error("An account with this email already exists");
        err.statusCode = 400;
        return next(err);
    }



    let profilePicUrl = {
        url:null,
        public_id:null
    };

    if(req.files && req.files?.profilePic?.length >0){
        const profilePicPath = req.files.profilePic[0].path;
        const upload = await uploadOnCloudinary(profilePicPath);
        profilePicUrl = {
            url:upload.secure_url,
            public_id:upload.public_id
        }
    }

    const newUser = await User.create({
        fullName,
        email,
        password,
        profilePic:profilePicUrl
    })

   const {accessToken,refreshToken}= generateTokens(newUser._id);
    await storeRefreshTokenInRedis(newUser._id,refreshToken);
     setCookies( res,accessToken,refreshToken);

    newUser.password = undefined;

    return res.status(201).json({
        success:true,
        user:newUser
    })
    
   } catch (error) {
    console.log("Error in signUp controller", error.message);
    next(error);
 
   }
 
    
}