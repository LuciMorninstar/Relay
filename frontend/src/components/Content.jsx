import React, { use, useEffect, useRef, useState } from "react";
import { VscSend } from "react-icons/vsc";
import { CiImageOn } from "react-icons/ci";
import { useSendMessage } from "../hooks/useMessage";
import { LuLoader } from "react-icons/lu";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useUser } from "../hooks/useUser.js";


const Content = ({otherUserId:receiverId}) => {

  const queryClient = useQueryClient();
  const {data:user} = useUser();
  const userId = user?._id; //loggedInuserId



  const {mutate, isPending,  data} = useSendMessage();

  const fileRef = useRef(null);
  const [messageData, setMessageData] = useState({
    text: "",
    image: [],
    video: [],
  });

  // console.log(messageData, "sendMessageData");
  // console.log(receiverId, "reciverIdComing or not"); 

  const handleChange = (e) => {
    setMessageData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // for image and video

  const handleFileChange = (e)=>{ 
    const selectedFiles = Array.from(e.target.files);

    const images = selectedFiles.filter((file)=> file.type.startsWith("image/"));

    const videos = selectedFiles.filter((file)=> file.type.startsWith("video/"));

      setMessageData((prev) => ({
    ...prev,
    image: [...prev.image, ...images],
    video: [...prev.video, ...videos],
  }));

}


  const handleSendMessage = (e)=>{

    if(messageData.text === "" && messageData.image.length === 0 && messageData.video.length === 0){
     return toast.error("Please enter a message");
    
    }
    console.log("clicked", receiverId);

    // since we are using files so appending is required
    const formData = new FormData();
    formData.append("text", messageData.text);

    messageData.image.forEach((img)=>{
      formData.append("image", img);
    })
    messageData.video.forEach((vid)=>{
      formData.append("video", vid);
    })

    for (let [key, value] of formData.entries()) {
  console.log(key, value, "Form data");
}


    e.preventDefault();
    // console.log(messageData, "Data sent to mutation query");
    
    mutate({receiverId, formData},
      {
        /**
         * Called when the message is sent successfully
         * Shows a toast message "Message sent successfully"
         * Resets the messageData state to its initial values
         */
        onSuccess:()=>{
          toast.success("Message sent successfully");
          queryClient.invalidateQueries({queryKey:["messages", receiverId]});

          setMessageData({
            text: "",
            image: [],
            video: [],
          })
        },

        onError:(error)=>{
          toast.error(error.response?.data?.message || "An error occured while sending message");
        }
      }
    );




  };




 

  return (
    <div className=" relative w-full px-3 py-3 bg-dark-secondary-color  flex flex-row justify-between gap-6 items-center border-t border-t-gray-700">

      <form onSubmit ={handleSendMessage} 
      encType="multipart/form-data "
      className = "flex w-full flex-row justify-between gap-6 items-center"
      >

    
      <input
        type="text"
        className="w-full px-2 py-1 rounded-lg bg-dark-secondary-color outline-none caret-green-500"
        placeholder="Type your message..."
        name="text"
        onChange={handleChange}
        value={messageData.text}
      />

      <div
        onClick={() => fileRef.current?.click()}
        className=" text-2xl cursor-pointer"
      >
        <CiImageOn />
        {/* for both image and video */}
        <input
          ref={fileRef}
          type="file"
        
          accept="image/*,video/*"
          onChange={handleFileChange}
          className="bg-green-300 hidden "
          multiple
        />
      </div>

      <button 
      // onClick={handleSendMessage}
      type="submit"
      disabled={isPending}

       className="px-3 py-2 text-white bg-green-400 rounded-lg cursor-pointer">
        {isPending ? <LuLoader className="animate-spin text-xl"/>: <VscSend />}
       
      </button>

      <div className={`${messageData?.image?.length <=0 && messageData?.video?.length <=0 && "hidden"} absolute z-10  bg-dark-primary-color overflow-hidden rounded-t-xl p-4  -top-30 right-0 w-50 h-30 grid grid-cols-${messageData.image.length + messageData.video.length} } gap-2`}>
        {
          messageData?.image?.map((img)=>(
            <img src = {URL.createObjectURL(img) } alt="img"
            className = " p-1" />
          ))
        }
         {
          messageData?.video?.map((vid)=>(
           <video
            src={URL.createObjectURL(vid)}
            controls
            className="w-20 h-20 rounded"
          />
          ))
        }
        
      </div>
        </form>
    </div>
  );
};

export default Content;
