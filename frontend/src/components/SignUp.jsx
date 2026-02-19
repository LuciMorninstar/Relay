import React from 'react'
import WidthWrapper from './WidthWrapper'
import signUpImage from "../assets/images/signup.png"
import { useState } from 'react'
import { IoEyeOff } from "react-icons/io5";

import { FaRegEye } from "react-icons/fa";
import { Link } from 'react-router-dom';




const SignUp = () => {

    const [formData, setFormData] = useState({fullName:"",email:"", password:""});

    const [togglePassword, setTogglePassword] = useState(false);

    const handleSignUp=(e)=>{
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

            <div className='flex flex-col gap-5 px-16 py-5 mt-30'>
 
                <h2 className='mx-auto'>Create A Relay Account</h2>

                <form onSubmit={handleSignUp} className='flex flex-col gap-3 '>

                    <div className='w-full flex flex-col gap-1'>
                        <label>fullName</label>
                        <input className='input_bar' type="text" placeholder='Enter fullName'
                        name="fullName"
                        onChange={handleChange}
                        value={formData.fullName}/>
                    </div>

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

                    <button type="submit" className = "bg-green-500 px-3 py-2 rounded-md text-white mt-4"><span className='text-xl'>Sign Up</span></button>

                    <span className=' mx-auto mt-4'>Already have an account? <Link className='text-dark-tertiary-color pl-1' to ="/signin"> Sign In</Link></span>


                </form>



            </div>

        </aside>

        <aside className='w-full lg:w-1/2  flex flex-col gap-3'>
            {/* image part */}
            <div className = "w-full h-full">
                <img className='bg-cover object-center' src={signUpImage} alt = "signUp image"/>
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

export default SignUp