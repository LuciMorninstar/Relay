import { axiosInstance as axios } from "./axios";
import {create } from "zustand";
import toast from "react-hot-toast";

export const useUserStore = create((set,get)=>({
    user:null,
    isLoading:false,
    


   signUp: async(formData)=>{
    const response = await axios.post("/auth/signUp", formData);
    // set({user:response.data.user});
    return response.data;  // return the reponse data to the tanstack query function so that it can access the data.

   },
    


}))