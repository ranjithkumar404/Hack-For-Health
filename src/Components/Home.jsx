import React, { useEffect, useState } from 'react';
import { FaHeart } from 'react-icons/fa';
import axios from 'axios';

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

    const calValue = parseInt(cal, 10);
    const calFatValue = parseInt(calFat, 10);
    const satFatValue = parseInt(sat, 10);
    const tranFatValue = parseInt(tran, 10);
    const cholValue = parseInt(chol, 10);
    const sodiumValue = parseInt(sodium, 10);
    const carbValue = parseInt(carb, 10);

    axios
      .post(' http://127.0.0.1:5000/predict', {
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
        <div className='flex  items-center relative justify-center'>
          <FaHeart className='text-xl z-30 absolute left-[95px] text-red-700' size={45} />
          <div className='bg-white z-10  border-[3px] border-black w-[220px]  rounded-md h-[30px]'></div>
          <div style={{ width: `${progress}px` }} className='bg-red-600 rounded-l-md z-20 absolute  h-[25px] duration-500  left-[110px]'></div>
        </div>
        <p className=''>Worried about Health?</p>
        <p>Say no more, WE GOT THIS!!</p>
      </div>
      <div className='text-[20px] flex flex-col space-y-3'>
        <input
          className='bg-blue-400 focus:outline-none p-5 rounded-md placeholder-white w-[300px]  h-[50px]'
          placeholder='Enter the calories'
          value={cal}
          onChange={(e) => setCal(e.target.value)}
          type='number'
        />
        <input
          className='bg-blue-400 focus:outline-none p-5 rounded-md placeholder-white w-[300px]  h-[50px]'
          placeholder='Enter the cal_fat'
          value={calFat}
          onChange={(e) => setCalFat(e.target.value)}
          type='number'
        />
        <input
          className='bg-blue-400 focus:outline-none p-5 rounded-md placeholder-white w-[300px]  h-[50px]'
          placeholder='Enter the saturated_fat'
          value={sat}
          onChange={(e) => setSat(e.target.value)}
          type='number'
        />
        <input
          className='bg-blue-400 focus:outline-none p-5 rounded-md placeholder-white w-[300px]  h-[50px]'
          placeholder='Enter the trans_fat'
          value={tran}
          onChange={(e) => setTran(e.target.value)}
          type='number'
        />
        <input
          className='bg-blue-400 focus:outline-none p-5 rounded-md placeholder-white w-[300px]  h-[50px]'
          placeholder='Enter the cholesterol'
          value={chol}
          onChange={(e) => setChol(e.target.value)}
          type='number'
        />
        <input
          className='bg-blue-400 focus:outline-none p-5 rounded-md placeholder-white w-[300px]  h-[50px]'
          placeholder='Enter the sodium'
          value={sodium}
          onChange={(e) => setSodium(e.target.value)}
          type='number'
        />
        <input
          className='bg-blue-400 focus:outline-none p-5 rounded-md placeholder-white w-[300px]  h-[50px]'
          placeholder='Enter the total_carb'
          value={carb}
          onChange={(e) => setCarb(e.target.value)}
          type='number'
        />
        <form onSubmit={submit}>
          <button className='border-2 border-white' type='submit'>
            SUBMIT
          </button>
        </form>
      </div>
      {result && (
        <div className='text-[20px]'>
          <p>Result: {result.safety}</p>
          <p>Predicted Value: {result.predicted_value}</p>
        </div>
      )}
    </div>
   </>
  );
};

export default Home;