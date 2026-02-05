import jwt from "jsonwebtoken";
import redis from "./redis.js"
import "dotenv/config"

export const generateTokens = (userId)=>{

    const accessToken = jwt.sign({userId}, process.env.ACCESS_TOKEN_SECRET_KEY, {expiresIn:process.env.ACCESS_TOKEN_EXPIRES_IN});

    const refreshToken = jwt.sign({userId}, process.env.REFRESH_TOKEN_SECRET_KEY, {expiresIn:process.env.REFRESH_TOKEN_EXPIRES_IN});

    return ({accessToken, refreshToken});


}

export const storeRefreshTokenInRedis = async(userId,refreshToken)=>{
    try {
        await redis.set(`refreshToken${userId}`,refreshToken,"EX", Number(process.env.REDIS_REFRESH_TOKEN_TTL));
        
    } catch (error) {
        console.log("Error in storeRefreshTokenInRedis function",error);
        
    }

}


export const setCookies = (res,accessToken,refreshToken)=>{
    res.cookie("accessToken",accessToken,{
        httpOnly:true,
        secure:process.env.NODE_ENV === "production",
        sameSite:"strict",
        maxAge:30*60*1000
    })
      res.cookie("refreshToken",refreshToken,{
        httpOnly:true,
        secure:process.env.NODE_ENV==="production",
        sameSite:"strict",
        maxAge:7*24*60*60*1000
    })
}