import React, { useRef, useState } from 'react'
import { VscSend } from "react-icons/vsc";
import { CiImageOn } from "react-icons/ci";




const Content = () => {

    const [message, setMessage] = useState("");
    const imageRef = useRef(null);
    const [messageData, setMessageData] = useState({message:"", image:null})


  return (
    <div className = "w-full px-3 py-3 bg-dark-secondary-color  flex flex-row justify-between gap-6 items-center border-t border-t-gray-700">
        <input type="text" 
        className = "w-full px-2 py-1 rounded-lg bg-dark-secondary-color outline-none caret-green-500"
        placeholder="Type your message..."
        onChange={(e) => setMessage(e.target.value)}
        value={message} />

        <div onClick={() => imageRef.current?.click()}
            className = " text-2xl cursor-pointer">
            <CiImageOn />

              <input ref={imageRef} type="file" className = "bg-green-300 hidden " />
        </div>

      


        <button className = "px-3 py-2 text-white bg-green-400 rounded-lg cursor-pointer">
            <VscSend />
        </button>
        

    </div>
  )
}

export default Content