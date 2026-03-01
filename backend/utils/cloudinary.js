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

// this is for multiple files since the image and video when uploaded to the cloudinary it will be in the form of array of paths so for that we are using the map function with Array checking
//(For image and video)
        if(Array.isArray(localFilePath)){
            return Promise.all(localFilePath.map((path)=>cloudinary.uploader.upload(path,{
                folder:"Relay_files",
                resource_type:"auto"
            })));
            
        }

        if(!localFilePath){
            return null;
        }

      
//for single file (profilePic)
        const response = await cloudinary.uploader.upload(localFilePath,{
            folder:"Relay_Users",
            resource_type:"auto"
        })

        console.log(" Successfully uploaded file to cloudinary", response.original_filename);
        fs.unlinkSync(localFilePath);

        return response;

        
    } catch (error) {
       if (localFilePath && !Array.isArray(localFilePath)) {
    fs.unlinkSync(localFilePath);
  }
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