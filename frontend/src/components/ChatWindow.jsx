import React from 'react'
import NoChatWindow from './NoChatWindow'
import avatar from "../assets/images/avatar.png"
import kaneki from "../assets/images/kaneki.png"
import ayanokoji from "../assets/images/ayanokoji.jpg"
import Content from './Content'
import { useUser } from "../hooks/useUser.js";
import { useRef } from 'react'
import { useEffect } from 'react'

const ChatWindow = ({messageQuery}) => {
  
 

  const {data:user} = useUser();
  // console.log(user, "user data");

  // to get the other userId beside the loggined user 
  const messages = messageQuery?.data || [];

   //for scrolling to the bottom seciton of the messages
   const messagesEndRef = useRef(null);

   useEffect(()=>{
    messagesEndRef.current?.scrollIntoView({behavior:"smooth"});
   },[messages])

   //scroll everytime the messages array changes - here dependency array is important blank doesn't work

  const otherUserId = messages.length > 0 ?
  (messages[0].senderId._id === user._id ? messages[0].receiverId._id:messages[0].senderId._id) :null;
  console.log(otherUserId, "otherUserId"); /*working - Sending this to the Content component as props so that reciverId can be used to send Message via useSendMessage mutation query in Content component*/

  // to get the other userId check through the messages of array , check the first message in the array if it's senderId._id is equal to user._id then the otherUserId will be messages[0].receiverId._id else the otherUserId will be messages[0].senderId._id



  return (

    <aside className= "w-7/12 sm:w-7/12 lg:w-3/4 h-full flex flex-col gap-3  ">
      <header className = "w-full px-3 py-2  bg-dark-secondary-color shadow-xl  ">
         <div className="flex flex-row items-center gap-2">
                 <div className="w-8 h-8 lg:w-12 lg:h-12 rounded-full ">
                   <img
                     className="w-full h-full rounded-full object-cover object-center"
                     src={user?.profilePic?.url || avatar}
                     alt="profile"
                   />
                 </div>
       
                 <span className="text-white text-base sm:text-base lg:text-lg flex flex-col gap-0">
                   <p className="text-sm sm:text-base lg:text-lg">{user?.fullName || "User"}</p>
                   <span className="text-xs lg:text-sm">Online</span>
                 </span>
               </div>

      </header>


      {/* chat container */}
      {(messageQuery?.data && messageQuery.data.length >0) ?
      
      <section className="flex flex-col gap-0 h-full w-full overflow-auto no-scrollbar ">


        {(messageQuery?.data || []).map((chat,i)=>{

          const isSentByMe = chat.senderId?._id === user?._id;

       const profilePic = isSentByMe
  ? chat.senderId?.profilePic?.url || avatar
  : chat.senderId?.profilePic?.url || avatar;
  // so for other user he is the sender so this is used

         const senderName = isSentByMe
  ? chat.senderId?.fullName
  : chat.senderId?.fullName;

          return(
            <div key={i}
            className = {`relative ${isSentByMe ? "mr-6 chat chat-end" : "ml-6 chat chat-start"}`}
            >
              <div className = "chat chat-bubble py-2">
                 {chat.text && <p className="">{chat.text}</p>}

    {/* Images */}
    {chat.image?.length > 0 &&
      chat.image.map((img, idx) => (
        <img
          key={idx}
          src={img.url}
          alt={senderName}
          className="max-w-xs max-h-48 rounded-lg object-cover"
        />
      ))}

    {/* Videos */}
    {chat.video?.length > 0 &&
      chat.video.map((vid, idx) => (
        <video
          key={idx}
          src={vid.url}
          controls
          className="max-w-xs max-h-48 rounded-lg"
        />
      ))}
                

              </div>

            
             
              <span className='text-xs chat-footer'>

                {new Date(chat.createdAt).toLocaleTimeString([],{hour:"2-digit", minute:"2-digit"})}
              </span>
              {/* for image */}
              <div className={`absolute bottom-0 ${isSentByMe? "-right-5 L" : "-left-5 "} -translate-y-5`}>
                <img src={profilePic}
                alt={senderName}
                className = "w-6 h-6 rounded-full object-cover object-center"
                />

              </div>

            </div>
          )
         
       
})}

    <div ref={messagesEndRef}>
{/* //For scroll to the bottom */}
    </div>
        



      </section>

      :
      <NoChatWindow/>

}

      <Content otherUserId={otherUserId}/>

      




     
    </aside>

  
  )
}

export default ChatWindow