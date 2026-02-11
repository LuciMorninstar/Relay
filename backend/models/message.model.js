import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    receiverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    text:{
        type:String,
    },
    image:
    [
        {
            url:{
                type:String,
                default:null
            },
            public_id:{
                type:String,
                default:null
            }
        }
    ],
    video:[
    {
        url:{
            type:String,
            default:null
        },
        public_id:{
            type:String,
            default:null
        }
    }

    ],

    reply:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Message"
    },

    isRead:{
        type:Boolean,
        default:false
    },

    groupId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Group"
    }


},{timestamps:true});

const Message = mongoose.model("Message", messageSchema);

export default Message;