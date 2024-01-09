import React from 'react'

const Home = () => {
  return (
    <div className='flex flex-col space-y-10 justify-center items-center'>
    <div className='text-center'>
        <p>Worried about Health?</p>
        <p>No worries WE GOT THIS!!</p>
    </div>
  <div>
    <input className='bg-blue-400 focus:outline-none p-5 rounded-md placeholder-white w-[300px] h-[50px]' placeholder='Enter the Product' type="text" />
    
  </div>
    </div>
  )
}

export default Home