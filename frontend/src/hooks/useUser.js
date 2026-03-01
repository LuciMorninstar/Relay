import { useQuery } from "@tanstack/react-query";
import {axiosInstance as axios} from "../utils/axios.js"
import { getAllUsers } from "../api/messagesApi.js";


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



export const signUp = async (formData)=>{
    const res = await axios.post("/auth/signUp", formData);
    return res.data;
}

export const signIn = async (formData)=>{
    const res = await axios.post("/auth/signIn", formData);
    return res.data;
}



export const logoutUser = async()=>{
    const res = await axios.post("/auth/logout");
    return res.data;
}


export const useGetAllUsers = ()=>{
    return useQuery({
        queryKey:["users"],
        queryFn:getAllUsers
        
    })
}

