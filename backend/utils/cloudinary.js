import {v2 as cloudinary} from "cloudinary"
import fs from "fs"
import "dotenv/config"

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET


});


export const uploadOnCloudinary = async(localFilePath)=>{
    try {
        if(!localFilePath){
            const err = new Error("No localPath provided");
            err.statusCode = 400;
            return next(err);
        }

        const response = await cloudinary.uploader.upload(localFilePath,{
            folder:"Relay_Users/profilePics",
            resource_type:"auto"
        })

        console.log(" Successfully uploaded file to cloudinary", response.original_filename);
        fs.unlinkSync(localFilePath);

        return response;

        
    } catch (error) {
        fs.unlinkSync(localFilePath);
        return null;
        
    }
}


export const deleteFromCloudinary = async(public_id)=>{
    try {
        if(!public_id){
            return null;
        }

        const response = await cloudinary.uploader.destroy(public_id);
        console.log(`Successfully delted file with public_id of ${public_id} from cloudinary`);

        return response;
        
    } catch (error) {
        console.log(`Error deleting file from cloudinary with the public_id of ${public_id}`);
        return null;
        
    }
}