import React, { use } from "react";
import { useState } from "react";
import avatar from "../assets/images/avatar.png";
import kaneki from "../assets/images/kaneki.png";
import { LuLogOut } from "react-icons/lu";
import ChatContacs from '../components/ChatContacs';
import { logoutUser, useUser } from "../hooks/useUser.js";
// import { useMyChats } from "../hooks/useMessage.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const RelaySidebar = () => {


  const {data:user} = useUser();
  console.log(user, "user data");


  
  const topics = ["Chats", "Contacts"];
  const [activeTopic, setActiveTopic] = useState("Chats");
  console.log(activeTopic, "active topic");

  const navigate = useNavigate();
  
  const queryClient = useQueryClient();

  const logoutMutation = useMutation({
    mutationFn: logoutUser,
    onSuccess: ()=>{
      toast.success("Logged out successfully");
      // queryClient.setQueryData(["user"], null); // set the user data to null in the cache after logging out so that it can be accessed in other components without making another API call.

      // or we can just remove the query
      queryClient.removeQueries({queryKey:["user"]});



        queryClient.invalidateQueries({queryKey:["user"]}); // invalidate the user query to refetch the user data and update the UI accordingly after logging out. This is important because some components might be using the user data from the cache, and we want to make sure that they get the updated data (null) after logging out.

        navigate("/signIn");
    },

  

    onError: (error)=>{
      toast.error(error.reponse?.data?.message || "An error occured while logging out");
    }
  })


  const handleLogout = (e)=>{
    e.preventDefault();

    logoutMutation.mutate();

    

    



  }




  return (
    <aside className="flex flex-col gap-4 w-5/12 sm:w-4/12 lg:w-1/4 px-1 lg:px-2 py-4 shadow-r shadow-lg">

      
      {/* 1st part - Profile  */}
      <div className="flex  flex-row justify-between items-center py-4 px-1 sm:px-2 lg:px-3 border-b border-b-gray-500 ">
        {/* leftside */}
        <div className="flex flex-row items-center gap-2">
          <div className="w-8 h-8 lg:w-12 lg:h-12 rounded-full ">
            <img
              className="w-full h-full  object-cover object-center rounded-full"
              src={user?.profilePic?.url ||  avatar}
              alt="profile"
            />
          </div>

          <span className="text-text-primary-color text-base sm:text-base lg:text-lg flex flex-col gap-1">
            <p className="text-sm sm:text-base lg:text-lg">{user? user.fullName :"User"}</p>
            <span className="text-xs lg:text-sm">Online</span>
          </span>
        </div>

        {/* /left side */}

        {/* right side */}

        <LuLogOut onClick={handleLogout} className="cursor-pointer" />
        {/* /right side */}
      </div>
      {/* /1st part -profile */}

      {/* 2nd part -Topics */}

      <div className="flex flex-row gap-2 w-full  py-1 ">
        {topics.map((topic) => (
          <span
            onClick={() => setActiveTopic(topic)}
            className={`${activeTopic === topic && "bg-green-500 duration-300 transition-all ease-in-out"} w-full hover:bg-green-500 lg:px-5 py-1 lg:py-2 rounded-xl cursor-pointer text-xs sm:text-sm lg:text-base text-white text-center`}
          >
            {topic}
          </span>
        ))}
      </div>

      {/* /2nd part Topics */}

      {/* 3rd part -content */}

      <ChatContacs activeTopic={activeTopic} />

      {/* /3rd part-content */}
    </aside>
  );
};

export default RelaySidebar;
