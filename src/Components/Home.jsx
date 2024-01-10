import React, { useEffect, useState } from 'react'
import { FaHeart } from "react-icons/fa";


const Home = () => {
  const [progress,setProgress]=useState(0);
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (progress < 200) {
        setProgress((prevProgress) => prevProgress + 20);
      }
      else
        setProgress(0)
    }, 1000);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [progress]); 
   
  
  return (
    <div className='flex flex-col space-y-10 justify-center items-center'>
    <div className='text-center text-[50px]'>
        <h1 className='head '>HEALTH BAR</h1>
        <div className='flex  items-center relative justify-center'>
          <FaHeart className='text-xl z-30 absolute left-[90px] text-red-700' size={45}  />
          <div className='bg-white z-10  border-[3px] border-black w-[220px]  rounded-md h-[30px]'></div>
          <div style={{width:`${progress}px`}} className='bg-red-600 rounded-l-md z-20 absolute  h-[25px] duration-300  left-[108px]'>

          </div>
          </div>
        <p className=''>Worried about Health?</p>
        <p>No worries WE GOT THIS!!</p>
    </div>
  <div className='text-[20px]'>
    <input className='bg-blue-400 focus:outline-none p-5 rounded-md placeholder-white w-[300px]  h-[50px]' placeholder='Enter the Product' type="text" />
    
  </div>
    </div>
  )
}

export default Home