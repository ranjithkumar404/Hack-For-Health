import React, { useEffect, useState } from 'react'
import { FaHeart } from "react-icons/fa";
import axios from 'axios';

const Home = () => {
  const [cal,setcal]=useState('')
  const[calfat,setcalfat]=useState('')
  const[sat,setsat]=useState('')
  const[tran,settran]=useState('')
  const[chol,setchol]=useState('')
  const[sodium,setsodium]=useState('')
  const[carb,setcarb]=useState('')
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
  const submit = () => {
    axios.post('http://localhost:5000/predict', {
      calories: cal,
      calories_from_fat: calfat,
      saturated_fat: sat,
      trans_fat: tran,
      cholesterol: chol,
      sodium: sodium,
      total_carb: carb,
    })
    .then(response => {
      console.log("submitted");
      console.log(response.data.result);
      // Handle the response as needed
    })
    .catch(error => {
      console.error(error);
    });
  }

  
  return (
    <div className='flex flex-col space-y-10 justify-center items-center'>
    <div className='text-center text-[50px]'>
        <h1 className='head '>HEALTH BAR</h1>
        <div className='flex  items-center relative justify-center'>
          <FaHeart className='text-xl z-30 absolute left-[95px] text-red-700' size={45}  />
          <div className='bg-white z-10  border-[3px] border-black w-[220px]  rounded-md h-[30px]'></div>
          <div style={{width:`${progress}px`}} className='bg-red-600 rounded-l-md z-20 absolute  h-[25px] duration-500  left-[110px]'>

          </div>
          </div>
        <p className=''>Worried about Health?</p>
        <p>Say no more, WE GOT THIS!!</p>
    </div>
  <div className='text-[20px] flex flex-col space-y-3'>
    <input className='bg-blue-400 focus:outline-none p-5 rounded-md placeholder-white w-[300px]  h-[50px]' placeholder='Enter the calories' value={cal} onChange={(e)=>(setcal(e.target.value))} type="text" />
    <input className='bg-blue-400 focus:outline-none p-5 rounded-md placeholder-white w-[300px]  h-[50px]' placeholder='Enter the saturated_fat' value={calfat} onChange={(e)=>(setcalfat(e.target.value))} type="text" />
    <input className='bg-blue-400 focus:outline-none p-5 rounded-md placeholder-white w-[300px]  h-[50px]' placeholder='Enter the trans_fat' value={tran} onChange={(e)=>(settran(e.target.value))} type="text" />
    <input className='bg-blue-400 focus:outline-none p-5 rounded-md placeholder-white w-[300px]  h-[50px]' placeholder='Enter the cholesterol' value={chol}  onChange={(e)=>(setchol(e.target.value))}type="text" />
    <input className='bg-blue-400 focus:outline-none p-5 rounded-md placeholder-white w-[300px]  h-[50px]' placeholder='Enter the sodium' value={sodium} onChange={(e)=>(setsodium(e.target.value))} type="text" />
    <input className='bg-blue-400 focus:outline-none p-5 rounded-md placeholder-white w-[300px]  h-[50px]' placeholder='Enter the total_carb' value={carb} onChange={(e)=>(setcarb(e.target.value))} type="text" />
    <form onSubmit={submit}>
          <button className='border-2 border-white' type='submit'>
            SUBMIT
          </button>
        </form>
  </div>
    </div>
  )
}

export default Home