import User from "../models/user.model.js";

export const getCurrentUser = async (req,res, next)=>{


    try {
        
    const userId = req.user?._id;
    
    if(!userId){
        const err = new Error("Not logged in");
        err.statusCode = 404;
        return next(err);

    }

     const user = await User.findById(userId).select("-password");

     if(!user){
        const err = new Error("User not found");
        err.statusCode = 404;
        return next(err);

     }
      return res.status(200).json({
        success:true,
        user:user
      })


        
    } catch (error) {
        next(error);
        
    }


}