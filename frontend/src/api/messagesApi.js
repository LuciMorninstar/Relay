import { axiosInstance as axios } from "../utils/axios";

export const getMessagesById = async(id)=>{

    const res = await axios.get(`/message/${id}`);
    return res.data.messages;

}