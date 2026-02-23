import React from "react";
import { useState } from "react";
import avatar from "../assets/images/avatar.png";
import kaneki from "../assets/images/kaneki.png";
import { LuLogOut } from "react-icons/lu";
import ChatContacs from '../components/ChatContacs';

const RelaySidebar = () => {
  const topics = ["Chats", "Contacts"];
  const [activeTopic, setActiveTopic] = useState("Chats");
  console.log(activeTopic, "active topic");

  return (
    <aside className="flex flex-col gap-4 w-5/12 sm:w-4/12 lg:w-1/4 px-1 lg:px-2 py-4 shadow-r shadow-lg">
      {/* 1st part - Profile  */}
      <div className="flex  flex-row justify-between items-center py-4 px-1 sm:px-2 lg:px-3 border-b border-b-gray-500 ">
        {/* leftside */}
        <div className="flex flex-row items-center gap-2">
          <div className="w-8 h-8 lg:w-12 lg:h-12 rounded-full ">
            <img
              className="w-full h-full  object-cover object-center rounded-full"
              src={kaneki}
              alt="profile"
            />
          </div>

          <span className="text-text-primary-color text-base sm:text-base lg:text-lg flex flex-col gap-1">
            <p className="text-sm sm:text-base lg:text-lg">Stars Winner</p>
            <span className="text-xs lg:text-sm">Online</span>
          </span>
        </div>

        {/* /left side */}

        {/* right side */}

        <LuLogOut className="cursor-pointer" />
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
