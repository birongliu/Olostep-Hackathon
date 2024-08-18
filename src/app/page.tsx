"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; 


const Page: React.FC = () => {
  const [isClient, setIsClient] = useState<boolean>(false);
  const router = useRouter(); 

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleScraping = () => {
    router.push('/urlPage'); 
  };
  

  return (
    <main className="relative flex w-full h-screen bg-[url('/img/background.png')] bg-cover bg-center">
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-60"></div>

      <div className="relative flex flex-col justify-center items-center w-full z-10 px-4 md:px-8 lg:px-16">
        
          {/* "Welcome to" with dot SVG */}
          <div className="relative uppercase tracking-widest text-md bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent font-bold mb-4 shadow-lg flex items-center">
          
          {/* Dot SVG */}

          <div className="flex space-x-3 md:space-x-4 lg:space-x-5">

            <svg className="text-yellow-600 " width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="4" fill="currentColor"/>
            </svg>

            <svg className="text-yellow-500" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="4" fill="currentColor"/>
            </svg>

            <svg className="text-yellow-400 mr-2" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="4" fill="currentColor"/>
            </svg>

          </div>

          {/* "Welcome to" Text */}
          <span className="ml-2 md:ml-4 mr-2 md:mr-4 text-sm md:text-base lg:text-lg xl:text-xl bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent font-bold uppercase">
            Welcome to
          </span>
          
          <div className="flex space-x-3 md:space-x-4 lg:space-x-5">
            <svg className="text-yellow-400" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="4" fill="currentColor"/>
            </svg>
            <svg className="text-yellow-500" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="4" fill="currentColor"/>
            </svg>
            <svg className="text-yellow-600" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="4" fill="currentColor"/>
            </svg>
          </div>
        </div>
        
        {/* "SScrapetastic" */}
        <div className="text-[3rem] md:text-[5rem] lg:text-[6rem] xl:text-[7rem] bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent font-bold uppercase mb-4 shadow-lg px-4 md:px-6 lg:px-8 text-center">
          Scrapetastic
        </div>


        {/* " Description" */}
        <p className="relative uppercase tracking-widest text-sm md:text-base lg:text-lg xl:text-xl bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 bg-clip-text text-transparent font-bold mb-6 md:mb-8 lg:mb-10 shadow-lg text-center">
          
          {isClient && (
            <div className="flex space-x-2 md:space-x-3 lg:space-x-4 justify-center mb-4">
              <svg className="text-purple-400" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="4" fill="currentColor"/>
              </svg>
              <svg className="text-purple-500" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="4" fill="currentColor"/>
              </svg>
              <svg className="text-purple-600" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="4" fill="currentColor"/>
              </svg>
            </div>

          )}
          A platform that turns any webpage into actionable data with just a click!
        </p>


  {/* Buttons */}
        <div className="flex justify-center items-center">
          <div className="px-4 py-3 bg-gradient-to-r from-purple-700 to-blue-700 text-white rounded-lg hover:from-purple-600 hover:to-blue-800 transition">
            <button
              onClick={handleScraping}
              className="w-full h-full"
            >
              Start Scraping
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Page;
