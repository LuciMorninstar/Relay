import jwt from "jsonwebtoken"
import User from "../models/user.model.js";
export const protectRoute = async(req,res,next)=>{

   try {
     const accessToken = req.cookies.accessToken || req.headers?.authorization?.split(" ")[1];
 
     if(!accessToken){
         const err = new Error("Not authorized to access this route");
         err.statusCode = 401;
         return next(err);
     }
 
     const decoded = jwt.verify(accessToken,process.env.ACCESS_TOKEN_SECRET_KEY);
 
     const userId = decoded.userId;
 
     const user = await User.findById(userId).select("-password");
 
     if(!user){
         const err = new Error("User not found");
         err.statusCode = 404;
         return next(err);
     }
 
     req.user = user;
 
     next();

   } catch (error) {
    console.log("Error in protectRoute middleware", error.message);
    next(error);
    
   }


}


export const adminRoute = (req,res,next)=>{

    const user = req.user;

try {
        if(!user){
        const err = new Error("No user found");
        err.statusCode = 404;
        return next(err);
    }

    if(user.role !== "admin"){
        const err = new Error("User is not an admin");
        err.statusCode = 401;
        return next(err);
    }
    next();

} catch (error) {
    console.log("Error in adminRoute middleware", error.message);
    next(error);
    
}



}