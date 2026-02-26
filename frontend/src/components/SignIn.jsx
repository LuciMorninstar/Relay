import React from 'react'
import WidthWrapper from './WidthWrapper'
import signInImage from "../assets/images/login.png"
import { useState } from 'react'
import { IoEyeOff } from "react-icons/io5";
import { FaRegEye } from "react-icons/fa";
import { LuLoader, LuMessageCircle, LuTableRowsSplit } from "react-icons/lu";
import { Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { useUserStore } from '../utils/useUserStore';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import {QueryClient} from "@tanstack/react-query";



const SignIn = () => {
    
    const {signIn} = useUserStore();
    const queryClient = new QueryClient();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({email:"", password:""});

    const [togglePassword, setTogglePassword] = useState(false);

    const signInMutation = useMutation({

        mutationFn: signIn,

        onSuccess:(data)=>{
            console.log("User signed in", data.user);
            toast.success("Signed in successfully");

            setFormData({email:"", password:""});
            queryClient.setQueryData(["user"], data.user); // set the user data in the cache after signing in so that it can be accessed in other components without making another API call.

            navigate("/chat");


        },
        onError:(error)=>{
            toast.error(error.response?.data?.message || "An error occured while signing in");
        }

    })



    const handleSignIn=(e)=>{
        e.preventDefault();
        signInMutation.mutate(formData);

    }

    const handleChange = (e)=>{
        setFormData((prev)=>({
            ...prev,
            [e.target.name]:e.target.value, /*key: value*/
        }))
    }

  

  return (
    <WidthWrapper>
      <div className="w-full h-full py-10 px-10 flex flex-col bg-dark-secondary-color lg:flex-row gap-2 rounded-3xl">
        <aside className='w-full lg:w-1/2   '>

            <div className='flex flex-col gap-5 px-16 py-5 mt-24 '>

                     <div className='flex flex-col gap-5 items-center justify-center' >

                    <span className='text-7xl'><LuMessageCircle /></span> 
                
                       </div>



                <h2 className='mx-auto'>Log In to Relay Account</h2>

                <form onSubmit={handleSignIn} className='flex flex-col gap-3 '>

                 

                    <div className='w-full flex flex-col gap-1'>
                        <label>Email</label>
                        <input className='input_bar' type="email" placeholder='Enter your email'
                        name="email"
                        onChange={handleChange}
                        value={formData.email}/>
                    </div>

                    <div className=' w-full   flex flex-col gap-1'>
                          
                        <label>Password</label>
                            <div className='relative'>
                                <input className='input_bar' type={togglePassword? "text":"password"} placeholder='Enter a password'
                                name="password"
                                onChange={handleChange}
                                value={formData.password}
                                />
                                <span className='absolute right-4 top-1/2 -translate-y-1/2' onClick={()=>setTogglePassword((prev)=>!prev)}>{togglePassword ? 
                                    <IoEyeOff />:
                                    <FaRegEye />

                                }
                                </span>
                            </div>
                    </div>

                    <button type="submit" className = "bg-green-500 px-3 py-2 text-white rounded-md mt-4 cursor-pointer">
                        {
                            signInMutation.isPending?
                            <LuLoader className='animate-spin mx-auto text-2xl'/>: <span className='text-xl'>Sign In</span>
                        }
                       
                        </button>

                    <span className=' mx-auto mt-4'>Don't have an account? <Link className='text-dark-tertiary-color pl-1' to ="/signup"> Sign Up</Link></span>


                </form>



            </div>

        </aside>

        <aside className='w-full lg:w-1/2  flex flex-col gap-3'>
            {/* image part */}
            <div className = "w-full h-full">
                <img className='bg-cover object-center' src={signInImage} alt = "signUp image"/>
            </div>
            {/* /image part */}
        
            {/* content part */}
            <div className = " w-full flex flex-col gap-3 items-center justify-center">
                <h2>Connect Anytime, Anywhere</h2>

                <div className = "flex flex-row space-x-5 ">
                    <span className='tags'>Secure</span>
                    <span className='tags'>Fast</span>
                    <span className='tags'>Reliable</span>
                </div>

            </div>
            {/* /content part */}

        </aside>


      </div>
    </WidthWrapper>
    
  )
}

export default SignIn