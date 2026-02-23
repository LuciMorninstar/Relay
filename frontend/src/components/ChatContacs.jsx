import React from 'react'
import avatar from "../assets/images/avatar.png"

const ChatContacs = ({activeTopic}) => {

const chats = [
    {pic:avatar, name:"Jone Doe"},
    {pic:avatar, name:"Mexicon Joe"},
    {pic:avatar, name:"smithen Smith"}

]

const contacts = [
    {pic:avatar, name:"Fancy Doe"},
    {pic:avatar, name:"Mithen Byte"},
    {pic:avatar, name:"Luxermberg White"}

]


  return (

    <div className=' flex flex-col gap-1'>

        {
            (activeTopic === "Chats" ? chats : contacts).map((chat,i)=>(
                <div  key={i} className = "flex flex-row items-center gap-1 sm:gap-2 lg:gap-2 py-1 px-1 sm:py-2 sm:px-2 lg:py-3 lg:px-3 rounded-xl cursor-pointer bg-green-400">

                    <div className = "w-8 h-8 lg:w-10 lg:h-10 rounded-full ">
                        <img className='w-full h-full  object-cover object-center' src={chat.pic || avatar} alt="profile"/>
                    </div>

                    <span className='text-white text-xs sm:text-base lg:text-lg'>{chat.name || "User"}</span>
                    
                    

                </div>

            ))
        }



    </div>
  )
}

export default ChatContacs