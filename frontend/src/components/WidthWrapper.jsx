import React from 'react'

const WidthWrapper = ({children}) => {
  return (

    <section className='w-full mx-auto  min-h-screen flex items-center justify-center'>
      <div className='max-w-7xl p-2 lg:p-4 '>
        {children}
      </div>
    </section>
    
  )
}

export default WidthWrapper