import React from 'react'
import WidthWrapper from '../components/WidthWrapper'


import RelaySidebar from '../components/RelaySidebar';
import ChatWindow from '../components/ChatWindow';

const ChatPage = () => {




  return (
    <WidthWrapper>
        <div className = "w-full h-[calc(100vh-100px)]  bg-dark-secondary-color rounded-3xl flex flex-row gap-2 ">


            <RelaySidebar/>
            <ChatWindow/>

            

          
    
        </div>

    </WidthWrapper>
  )
}

export default ChatPage