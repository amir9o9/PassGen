import React from 'react'
import PasswordBox from './PasswordBox.jsx'

function Container() {
  return (
    <div className='max-w-[700px] w-[90%] m-25'>
            
        <h1 className='text-[#fff] text-[45px] mb-[30px]'>Stronger with 💪🏻<br/>
            <span className=' font-bold '> PassGen</span>
        </h1>

        <PasswordBox/>

    </div>
  )
}

export default Container