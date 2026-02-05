import mongoose from "mongoose";
import bcrypt from "bcryptjs"

const userSchema = new mongoose.Schema({
    fullName: {
        type:String,
        minLength:[4, "Full name must be at least 4 characters long"],
        maxLength:[30, "Full name cannot exceed 30 characters"],
        required:[true, "Full Name is required"],
        trim:true
    },
    email:{
        type:String,
        unique:true,
        lowercase:true,
        index:true,
        required:[true, "Email is required"],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please provide a valid email",
          ],
    },
    password:{
        type:String,
        required:true,
        minLength:[6, "Password must be at least 6 characters long"],
    },
    profilePic:{
            url:{type:String, default:null},
            public_id:{type:String, default:null}
    },
    role:{
        type:String,
        enum:["user", "admin"],
        default:"user"
    }

},{timestamps:true})


userSchema.pre("save", async function(){

    if(!this.isModified("password")) return;

  try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    
  } catch (error) {
    console.log(`Error hashing the password ${error}`);
    next(error);
    
  }

})

userSchema.methods.comparePassword = async function(typedPassword){
   return await bcrypt.compare(typedPassword, this.password);
}


const User = mongoose.model("User", userSchema);

export default User;