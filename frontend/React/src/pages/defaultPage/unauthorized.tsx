import React from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
  const navigate=useNavigate();

  const handleClick=(e: { preventDefault: () => void; })=>{
    e.preventDefault();
    navigate('/')
  }
  return (
    <>
      <div className="flex items-center justify-center w-screen h-screen">
        <div className="px-4 lg:py-12">
          <div className="lg:gap-4 lg:flex">
            <div className="flex flex-col items-center justify-center md:py-24 lg:py-32">
              <h1 className="font-bold text-blue-600 text-9xl">404</h1>
              <p className="mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl">
                <span className="text-red-500">Oops!</span> Page{" "}
              </p>
              <p className="mb-8 text-center text-gray-500 md:text-lg">
                The page you’re looking for doesn’t exist.
              </p>
              <button onClick={handleClick} className='bg-[#D3D3D3] hover:bg-opacity-60 shadow-2xl shadow-black font-bold text-blue-600 text-9md p-3 rounded-xl text-center' type='button'>Back To Home</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ErrorPage;
