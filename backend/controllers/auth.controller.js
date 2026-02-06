import User from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { generateTokens,storeRefreshTokenInRedis,setCookies } from "../utils/authReq.js";
import { sendEmail } from "../utils/resend.js";
import jwt from "jsonwebtoken"
import redis from "../utils/redis.js"

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

    await sendEmail(newUser.fullName,newUser.email);

    return res.status(201).json({
        success:true,
        user:newUser
    })
    
   } catch (error) {
    console.log("Error in signUp controller", error.message);
    next(error);
 
   }
 
    
}

export const signIn = async(req,res,next)=>{
    const {email, password} = req.body;

    try {

        
    if(!email || !password){
        const err = new Error("All fields are required");
        err.statusCode = 400;
        return next(err);
    }

    const existingUser = await User.findOne({email});

    if(!existingUser){
        const err = new Error("User with this email does not exist");
        err.statusCode = 401;
        return next(err);
    }

    const isPasswordCorrect = await existingUser.comparePassword(password);

    if(!isPasswordCorrect){
        const err = new Error("Invalid credentials");
        err.statusCode = 401;
        return next(err);
    }

    const {accessToken,refreshToken}= generateTokens(existingUser._id);
    await storeRefreshTokenInRedis(existingUser._id,refreshToken);
    setCookies( res,accessToken,refreshToken);

    return res.status(200).json({
        success:true,
        user:{
            id:existingUser._id,
            fullName:existingUser.fullName,
            email:existingUser.email,
            role:existingUser.role
        }
    })

        
    } catch (error) {
        console.log("Error in signIn controller", error.message);
        next(error);
        
    }


}


export const logout = async(req,res,next)=>{

    try {
        const refreshToken = req.cookies.refreshToken;

        if(refreshToken){
            const decoded = jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET_KEY);
            await redis.del(`refreshToken${decoded.userId}`);
        }

        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");

        res.status(200).json({
            success:true,
            message:"Logged out successfully"
        })
        
    } catch (error) {
        console.log("Error in logout controller", error.message);
        next(error);
        
    }
}


export const refreshToken = async(req,res,next)=>{

    try {
        const refreshToken = req.cookies.refreshToken;

        if(!refreshToken){
            const err = new Error("No refresh Token provided");
            err.statusCode = 401;
            return next(err);
        }

        const decoded = jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET_KEY);

        const storedRefreshToken = await redis.get(`refreshToken${decoded.userId}`);

        if(storedRefreshToken !== refreshToken){
            const err = new Error("Invalid refresh token");
            err.statusCode = 401;
            return next(err);
        }
        
        const accessToken = jwt.sign({userId:decoded.userId},process.env.ACCESS_TOKEN_SECRET_KEY,{expiresIn:process.env.ACCESS_TOKEN_EXPIRES_IN});

        res.cookie("accessToken",accessToken,{
            httpOnly:true,
            secure:process.env.NODE_ENV === "production",
            sameSite:"strict",
            maxAge:30*60*1000
        })

        return res.status(200).json({
            success:true,
            message:"Token refreshed successfully"
        })

    } catch (error) {
        console.log("Error in refreshToken controller", error.message);
        next(error);
        
    }
}


