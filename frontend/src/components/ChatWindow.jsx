import React from 'react'
import NoChatWindow from './NoChatWindow'
import avatar from "../assets/images/avatar.png"
import kaneki from "../assets/images/kaneki.png"
import ayanokoji from "../assets/images/ayanokoji.jpg"
import Content from './Content'
import { useUser } from "../hooks/useUser.js";

const ChatWindow = ({messageQuery}) => {
  

  const {data:user} = useUser();
  // console.log(user, "user data");

// const chats = [
//   { name: "Bibek Pandit", msg: "Hello man", date: "12:00 PM" },
//   { name: "Legion Power", msg: "Hey bro, what's up?", date: "12:01 PM" },
//   { name: "Bibek Pandit", msg: "Nothing much, working on my project", date: "12:02 PM" },
//   { name: "Legion Power", msg: "Nice, React one?", date: "12:03 PM" },
//   { name: "Bibek Pandit", msg: "Yeah, chat UI actually", date: "12:04 PM" },
//   { name: "Legion Power", msg: "Ohhh cool 🔥", date: "12:05 PM" },
//   { name: "Bibek Pandit", msg: "Need to design messages section", date: "12:06 PM" },
//   { name: "Bibek Pandit", msg: "Already installed 😂", date: "12:08 PM" },
//   { name: "Legion Power", msg: "Use DaisyUI components bro", date: "12:07 PM" },
//   { name: "Legion Power", msg: "Legend", date: "12:09 PM" },
//   { name: "Legion Power", msg: "Send me the link when done", date: "12:11 PM" },
//   { name: "Bibek Pandit", msg: "Will deploy tonight", date: "12:10 PM" },
//   { name: "Legion Power", msg: "Use DaisyUI components bro", date: "12:07 PM" },
//   { name: "Legion Power", msg: "Legend", date: "12:09 PM" },
//   { name: "Legion Power", msg: "Send me the link when done", date: "12:11 PM" },
//   { name: "Bibek Pandit", msg: "Will deploy tonight", date: "12:10 PM" },
// ];


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
        



      </section>

      <Content/>

      




     
    </aside>

  
  )
}

export default ChatWindow