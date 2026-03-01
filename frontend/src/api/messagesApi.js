import { axiosInstance as axios } from "../utils/axios";
import toast from "react-hot-toast";

export const getMessagesById = async(id)=>{

    const res = await axios.get(`/message/${id}`);
    return res.data.messages;

}

export const getAllUsers = async ()=> {
    const res = await axios.get("/message");
    return res.data;
}

export const sendMessage = async({receiverId:id, formData })=>{
    if (!formData || (!formData.get("text") && formData.getAll("image").length === 0 && formData.getAll("video").length === 0)) {
       return toast.error("Please enter a message");
    }
    const res = await axios.post(`/message/${id}`,formData);
    return res.data.message;
}