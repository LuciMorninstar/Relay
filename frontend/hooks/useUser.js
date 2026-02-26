import { useQuery } from "@tanstack/react-query";
import {axiosInstance as axios} from "../src/utils/axios.js"


export const getCurrentUser = async()=>{
    const res = await axios.get("/user/getCurrentUser",{
        withCredentials:true,
    });
    return res.data.user;
    
}
export const useUser = ()=>{
    return useQuery({
        queryKey:["user"],
        queryFn: getCurrentUser,
        retry: false, // Disable automatic retries on failure
    
    })
}