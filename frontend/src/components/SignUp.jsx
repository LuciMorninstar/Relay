import React from "react";
import WidthWrapper from "./WidthWrapper";
import signUpImage from "../assets/images/signup.png";
import { useState } from "react";
import { IoEyeOff } from "react-icons/io5";

import { FaRegEye } from "react-icons/fa";
import { IoCameraOutline } from "react-icons/io5";

import {  Link } from "react-router-dom";
import { useUserStore } from "../utils/useUserStore.js";
import { useRef } from "react";
import { QueryClient, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { LuLoader } from "react-icons/lu";

const SignUp = () => {

  const { signUp } = useUserStore();
  // const queryClient = new QueryClient();
  const navigate = useNavigate();

  const profilePicRef = useRef(null);

  
  const [formData, setFormData] = useState({
      fullName: "",
      email: "",
      password: "",
      profilePic:null
    });

  

const profilePreview = formData.profilePic ? URL.createObjectURL(formData.profilePic):null;

  const [togglePassword, setTogglePassword] = useState(false);


  const mutation = useMutation({
    mutationFn:signUp,
    onSuccess: (data)=>{
      toast.success("Sign up successfully. You can now sign in.");
      // queryClient.setQueryData(["user"], data.user)

      console.log("User signed up ", data.user);

      setFormData({
        fullName:"",
        email:"",
        password:"",
        profilePic:null
      })
      
      navigate("/signin");
    },

    onError:(error)=>{
      toast.error(error.response?.data?.message || "An error occurred while signing up", error);
    }


  })

  const handleSignUp = async (e) => {
    e.preventDefault();

    //Need this because we are sending multipart/form-data due to image upload to backend. If we send json data, the image will not be sent to backend and multer will not be able to process the request.
    const dataToSend = new FormData();
    dataToSend.append("fullName", formData.fullName);
    dataToSend.append("email", formData.email);
    dataToSend.append("password", formData.password);
    // dataToSend.append("profilePic", formData.profilePic);

    if(formData.profilePic){
        dataToSend.append("profilePic", formData.profilePic);
    }

    //this is for consoling data of appended data
    for (let [key, value] of dataToSend.entries()) {
    console.log(key, value);
}
  

    // await signUp(dataToSend);
    mutation.mutate(dataToSend);

  };

// console.log("muation is pending", mutation.isPending);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value /*key: value*/,
    }));
  };

  const handleProfilPicChange = (e)=>{
   if(e.target.files && e.target.files[0]){
    setFormData((prev)=>({
        ...prev,
        profilePic:e.target.files[0]
    }))
   } 

  }

  return (
    <WidthWrapper>
      <div className="w-full h-full py-10 px-10 flex flex-col bg-dark-secondary-color lg:flex-row gap-2 rounded-3xl">
        <aside className="w-full lg:w-1/2   ">
          <div className="flex flex-col gap-5 px-16 py-5 mt-30">
            <h2 className="mx-auto">Create A Relay Account</h2>

            <form onSubmit={handleSignUp} className="flex flex-col gap-3 " enctype="multipart/form-data">
              {/* image */}

              <div className="mx-auto relative w-24 h-24 rounded-full bg-dark-primary-color ">
                {formData.profilePic ? (

                <div className ="relative w-ful h-full rounded-full">
                  <img
                    src={profilePreview}
                    alt="profile-preview"
                    className="w-full h-full rounded-full object-cover object-center"
                  />
                  <IoCameraOutline onClick={() => profilePicRef.current?.click()} className=" text-xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white cursor-pointer" />
                    <input
                      ref={profilePicRef}
                      type="file"
                      name="profilePic"
                      onChange={handleProfilPicChange}
                      className="w-full h-full rounded-full hidden"
                    />


                  </div>
                ) : (
                  <>
                    <input
                      ref={profilePicRef}
                      type="file"
                      name="profilePic"
                      onChange={(e) => setFormData((prev) => ({ ...prev, profilePic: e.target.files[0] }))}
                      className="w-full h-full rounded-full hidden"
                    />
                    <div
                      onClick={() => profilePicRef.current?.click()}
                      className=" absolute top-0  w-24 h-24  rounded-full"
                    >
                      <IoCameraOutline className=" text-xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 " />
                    
                    </div>
                  </>
                )}
              </div>

              {/* /image */}

              <div className="w-full flex flex-col gap-1">
                <label>fullName</label>
                <input
                  className="input_bar"
                  type="text"
                  placeholder="Enter fullName"
                  name="fullName"
                  onChange={handleChange}
                  value={formData.fullName}
                />
              </div>

              <div className="w-full flex flex-col gap-1">
                <label>Email</label>
                <input
                  className="input_bar"
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  onChange={handleChange}
                  value={formData.email}
                />
              </div>

              <div className=" w-full   flex flex-col gap-1">
                <label>Password</label>
                <div className="relative">
                  <input
                    className="input_bar"
                    type={togglePassword ? "text" : "password"}
                    placeholder="Enter a password"
                    name="password"
                    onChange={handleChange}
                    value={formData.password}
                  />
                  <span
                    className="absolute right-4 top-1/2 -translate-y-1/2"
                    onClick={() => setTogglePassword((prev) => !prev)}
                  >
                    {togglePassword ? <IoEyeOff /> : <FaRegEye />}
                  </span>
                </div>
              </div>
            
              <button
              disabled = {mutation.isPending}
                type="submit"
                className="bg-green-500 px-3 py-2 rounded-md text-white mt-4 cursor-pointer"
              >
                {mutation.isPending ? <LuLoader className="animate-spin mx-auto text-2xl"/>:  <span className="text-xl">Sign Up</span>}
               
              </button>

              <span className=" mx-auto mt-4">
                Already have an account?{" "}
                <Link className="text-dark-tertiary-color pl-1" to="/signin">
                  {" "}
                  Sign In
                </Link>
              </span>
            </form>
          </div>
        </aside>

        <aside className="w-full lg:w-1/2  flex flex-col gap-3">
          {/* image part */}
          <div className="w-full h-full">
            <img
              className="bg-cover object-center"
              src={signUpImage}
              alt="signUp image"
            />
          </div>
          {/* /image part */}

          {/* content part */}
          <div className=" w-full flex flex-col gap-3 items-center justify-center">
            <h2>Connect Anytime, Anywhere</h2>

            <div className="flex flex-row space-x-5 ">
              <span className="tags">Secure</span>
              <span className="tags">Fast</span>
              <span className="tags">Reliable</span>
            </div>
          </div>
          {/* /content part */}
        </aside>
      </div>
    </WidthWrapper>
  );
};

export default SignUp;
