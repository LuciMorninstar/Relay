import React from 'react'
import WidthWrapper from './WidthWrapper'
import signInImage from "../assets/images/login.png"
import { useState } from 'react'
import { IoEyeOff } from "react-icons/io5";
import { FaRegEye } from "react-icons/fa";
import { LuMessageCircle } from "react-icons/lu";
import { Link } from 'react-router-dom';



const SignIn = () => {

    const [formData, setFormData] = useState({email:"", password:""});

    const [togglePassword, setTogglePassword] = useState(false);

    const handleSignIn=(e)=>{
        e.preventDefault();

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

                    <button type="submit" className = "bg-green-500 px-3 py-2 text-white rounded-md mt-4"><span className='text-xl'>Sign In</span></button>

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