import multer from "multer"



const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"public/temp");
        //must have the public/temp folder created first otherwise destination error

    },

    filename:function(req,file,cb){
        const uniqueName = Date.now()+ Math.floor(Math.random() *10);
        cb(null,file.originalname + "_" + uniqueName);
    }

})

const upload = multer({storage});
export default upload;