import { useQuery } from "@tanstack/react-query";
import {axiosInstance as axios} from "../utils/axios.js"

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