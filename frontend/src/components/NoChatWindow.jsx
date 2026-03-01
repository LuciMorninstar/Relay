import React from 'react'
import { LuMessageCircle } from "react-icons/lu";


const NoChatWindow = () => {
  return (
    <div className=' w-full h-full flex flex-col items-center justify-center gap-2'>
        <span className = "p-3 text-sm sm:text-base lg:text-2xl rounded-full bg-green-400 mb-3 ">
            <LuMessageCircle />
        </span>
        <h2>Select a converstaion</h2>
        <p className= "text-xs sm:text-sm lg:text-base">Type a message to start a conversation</p>
      {/* <p className = "btn "></p> */}


    </div>
  )
}

export default NoChatWindow