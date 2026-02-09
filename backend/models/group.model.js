import mongoose from "mongoose";

const groupSchema = new mongoose.Schema({

    groupName:{
        type:String,
        required:[true, "Group name is required"],
        trim:true,
    },
    groupMembers:
    [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true

         }
    ],
    groupPic:{
        url:{type:String, default:null},
        public_id:{type:String, default:null},
    },

    groupAdmins:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        }
    ]


},{timestamps:true})

const Group = mongoose.model("Group", groupSchema);
export default Group;