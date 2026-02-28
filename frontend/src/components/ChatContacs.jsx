import React from 'react'
import avatar from "../assets/images/avatar.png"
import { useMyChats } from '../hooks/useMessage';


const ChatContacs = ({activeTopic, setSelectedChatFriendId}) => {

    
  const {data:myChats, isLoading, isError} = useMyChats();

//   console.log(myChats, "mychats");

//for messagesById

// const handleShowMessages = (id)=>{
    
// }







    
  const {data:myChats, isLoading, isError} = useMyChats();

//   console.log(myChats, "mychats");







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

if(isLoading){
    return <div className="flex w-full flex-col gap-1">
  <div className="skeleton h-20 w-full"></div>
  <div className="skeleton h-20 w-full"></div>
  <div className="skeleton h-20 w-full"></div>

</div>
}

if(isError){
    return <div>Error</div>
}
  return (

    <div className=' flex flex-col gap-1'>

        {
            (activeTopic === "Chats" ? myChats || [] : contacts).map((chat,i)=>(
                <div onClick={()=>setSelectedChatFriendId(chat._id)}  key={i} className = "flex flex-row items-center gap-1 sm:gap-2 lg:gap-2 py-1 px-1 sm:py-2 sm:px-2 lg:py-3 lg:px-3 rounded-xl cursor-pointesr bg-gray-600">

                    <div className = "w-8 h-8 lg:w-10 lg:h-10 rounded-full ">
                        <img className='w-full h-full  object-cover object-center' src={chat?.profilePic?.url || avatar} alt="profile"/>
                    </div>

                    <span className='text-white text-xs sm:text-base lg:text-lg'>{chat?.fullName || "User"}</span>
                    
                    

                </div>

            ))
        }



    </div>
  )
}

export default ChatContacs