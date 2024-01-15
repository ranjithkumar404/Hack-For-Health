import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
import axios from 'axios';
import { IoMdHelpCircleOutline } from "react-icons/io";
const Home = () => {
  const [cal, setCal] = useState('');
  const [calFat, setCalFat] = useState('');
  const [sat, setSat] = useState('');
  const [tran, setTran] = useState('');
  const [chol, setChol] = useState('');
  const [sodium, setSodium] = useState('');
  const [carb, setCarb] = useState('');
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState(null);
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
  const submit = (e) => {
    e.preventDefault();
    if (!cal || !calFat || !sat || !tran || !chol || !sodium || !carb) {
      alert('Please fill in all required fields.');
      return;
    }
    if ( cal < 0 ||calFat < 0 || sat < 0 || tran< 0 ||chol < 0 ||  sodium < 0 ||  carb < 0
    ) {
      alert('Please enter non-negative values for all fields.');
      return;
    }
    const calValue = parseInt(cal, 10);
    const calFatValue = parseInt(calFat, 10);
    const satFatValue = parseInt(sat, 10);
    const tranFatValue = parseInt(tran, 10);
    const cholValue = parseInt(chol, 10);
    const sodiumValue = parseInt(sodium, 10);
    const carbValue = parseInt(carb, 10);

    axios
      .post(' https://hack-for-health-tau.vercel.app/predict', {
        calories: calValue,
        cal_fat: calFatValue,
        saturated_fat: satFatValue,
        trans_fat: tranFatValue,
        cholesterol: cholValue,
        sodium: sodiumValue,
        total_carb: carbValue,
      })
      .then((response) => {
        console.log('Submitted');
        console.log('Result:', response.data);

        // Set the result in the state
        setResult(response.data);
        
      })
      .catch((error) => {
        console.error('Error submitting data:', error);
      });
  };

  return (
   <>
    <div className='flex flex-col space-y-10 justify-center items-center'>
      <div className='text-center text-[50px]'>
        <h1 className='head '>HEALTH BAR</h1>
       <Link to='/help'> <IoMdHelpCircleOutline className='fixed animate-bounce top-[5%] left-[87%]' /></Link>
        <div className='flex  items-center relative justify-center'>
          <FaHeart className='text-xl z-30 absolute left-[95px] text-red-700' size={45} />
          <div className='bg-white z-10  border-[3px] border-black w-[220px]  rounded-md h-[30px]'></div>
          <div style={{ width: `${progress}px` }} className='bg-red-600 rounded-l-md z-20 absolute  h-[25px] duration-500  left-[110px]'></div>
        </div>
        <p className=''>Worried about Health?</p>
        <p>Say no more, WE GOT THIS!!</p>
      </div>
      <div className='text-[20px] flex flex-col space-y-3'>
       <div className='grid  place-items-center gap-3   md:flex md:space-x-5'>
       <input
          className='bg-blue-400 focus:outline-none p-5 rounded-md placeholder-white w-[300px]  h-[50px]'
          placeholder='Enter the calories in kcal'
          value={cal} required
          onChange={(e) => setCal(e.target.value)}
          type='number'
        />
        <input
          className='bg-blue-400 focus:outline-none p-5 rounded-md placeholder-white w-[300px]  h-[50px]'
          placeholder='Enter  the calories from fat in kcal'
          value={calFat} required
          onChange={(e) => setCalFat(e.target.value)}
          type='number'
        />
       </div>
       <div className='grid  place-items-center gap-3   md:flex md:space-x-5'>
       <input
          className='bg-blue-400 focus:outline-none p-5 rounded-md placeholder-white w-[300px]  h-[50px]'
          placeholder='Enter the Saturated Fat in grams'
          value={sat} required
          onChange={(e) => setSat(e.target.value)}
          type='number'
        />
        <input
          className='bg-blue-400 focus:outline-none p-5 rounded-md placeholder-white w-[300px]  h-[50px]'
          placeholder='Enter the Trans Fat in grams'
          value={tran} required
          onChange={(e) => setTran(e.target.value)}
          type='number'
        />
       </div>
     <div className='grid  place-items-center gap-3   md:flex md:space-x-5'>
     <input
          className='bg-blue-400 focus:outline-none p-5 rounded-md placeholder-white w-[300px]  h-[50px]'
          placeholder='Enter the Cholesterol in milliograms'
          value={chol} required
          onChange={(e) => setChol(e.target.value)}
          type='number'
        />
        <input
          className='bg-blue-400 focus:outline-none p-5 rounded-md placeholder-white w-[300px]  h-[50px]'
          placeholder='Enter the Sodium in milligrams'
          value={sodium} required
          onChange={(e) => setSodium(e.target.value)}
          type='number'
        />
     </div>
       <div className='grid  place-items-center gap-3   md:flex md:space-x-5'>
         <input
          className='bg-blue-400 focus:outline-none p-5 rounded-md placeholder-white w-[300px]  h-[50px]'
          placeholder='Enter the total_carb in grams'
          value={carb} required
          onChange={(e) => setCarb(e.target.value)}
          type='number'
        />
       </div>
        <form className='flex justify-center' onSubmit={submit}>
          <button className='border-2 w-[300px] border-white' type='submit'>
            SUBMIT
          </button>
        </form>
      </div>
      
      {result && (
       (result.safety=="Safe"?  <div className=' p-5 rounded-md bg-green-400 text-white hover:scale-125 text-[20px] duration-700'>
       <p className='text-center'>Result: {result.safety}</p>
       <p>You are good to go!</p>
     </div>:<div className=' p-5 bg-red-500 rounded-md  text-white hover:scale-125 text-[20px] duration-700'>
       <p className='text-center'>Result: {result.safety}</p>
       <p>Think before using it!!!</p>
     </div>)
      )}
      
    </div>
   </>
  );
};

export default Home;