import React from 'react'
import WidthWrapper from './WidthWrapper'
import logo from "../assets/images/relay_logo.png"

const HeroSection = () => {
  return (

    <WidthWrapper>
      <section className = "flex flex-col gap-5 w-7xl h-screen">
        <div className='mx-auto h-50 w-50  '>
          <img src={logo} className='w-full h-full object-cover object-center' alt="logo"/>
        </div>

      </section>

  
    </WidthWrapper>
 
  )
}

export default HeroSection