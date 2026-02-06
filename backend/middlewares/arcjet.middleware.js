
import {aj} from "../utils/arcjet.js";
export const arcjetMiddleware = async(req,res,next)=>{

    try {
        const decision = await aj.protect(req);
        //protech the incoming requests

        if(decision.isDenied()){
            if(decision.reason.isRateLimit()){
                return res.status(429).json({success:false,message:"Rate limit exceeded"});
            }
            if(decision.reason.isBot()){
                return res.status(403).json({success:false,message:"Bot detected"});
            }
        }
        next();
        
    } catch (error) {
        console.log("Error in arcjet middleware", error.message);
        next(error);
        
    }


}
    
