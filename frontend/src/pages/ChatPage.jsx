import React, { useState } from 'react'
import WidthWrapper from '../components/WidthWrapper'


import RelaySidebar from '../components/RelaySidebar';
import ChatWindow from '../components/ChatWindow';
import { useMessagesById } from '../hooks/useMessage.js';

const ChatPage = () => {

  //This selectedChatFriend is being used in chatContacts component
  const [selectedChatFriendId, setSelectedChatFriendId] = useState(null);
  console.log(selectedChatFriendId, "selectedChatFriendId");

  const messageQuery = useMessagesById(selectedChatFriendId);
  //here storing in a varibale to pass and in chatwindow shall i use messageQuery.data and all for loading and error

  console.log(messageQuery.data, "messageQuery.data"); /*working*/







  return (
    <WidthWrapper>
        <div className = "w-full h-[calc(100vh-100px)]  bg-dark-secondary-color rounded-3xl flex flex-row gap-2 ">


            <RelaySidebar setSelectedChatFriendId={setSelectedChatFriendId}/>
            <ChatWindow messageQuery = {messageQuery} />

            

          
    
        </div>

    </WidthWrapper>
  )
}

export default ChatPage