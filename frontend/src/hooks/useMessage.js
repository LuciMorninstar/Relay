import { useMutation, useQuery } from "@tanstack/react-query";
import {axiosInstance as axios} from "../utils/axios.js"
import {  getMessagesById, sendMessage } from "../api/messagesApi.js";

export const getMyChats = async()=>{
    const res = await axios.get("/message/myChats");
    return res.data.chatFriends;
}

export const useMyChats = ()=>{
    return useQuery({
        queryKey:["myChats"],
        queryFn:getMyChats

    })
}

export const useMessagesById = (id)=>{
    return useQuery({
        queryKey:["messages", id],  //depends upon id
        queryFn: () => getMessagesById(id), // since id is dynamic we need to use arrow function so that it can only be called when need to be called
        enabled:!!id  // only run the query when id exists if id is null or not there it will not run.preventing fall

    })

}

export const useSendMessage = ()=>{

    return useMutation({
        mutationFn:({receiverId,formData}) => sendMessage({
            receiverId,
            formData
        })
    })
   
}

