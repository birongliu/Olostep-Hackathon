
"use client";
import React, { useState, useEffect } from 'react';
import { SignInButton } from '@clerk/nextjs';

export default function NewPage() {
  const [isClient, setIsClient] = useState<boolean>(false);
  const [url, setUrl] = useState<string>('');

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Handle URL submission logic here
    console.log('Submitted URL:', url);
  };

  return (
    <main className="relative flex w-full h-screen bg-[url('/img/background.png')] bg-cover bg-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-65"></div>

      <div className="relative flex flex-col justify-center items-center w-full z-10">
        
 
        
        {/* "SNAP LEARN AI" */}
        <div className="text-[3rem] md:text-[3rem] bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent font-bold uppercase mb-4 shadow-lg">
          Ready to start scrapping?
        </div>

        {/* Description */}
          <p className="relative uppercase tracking-widest text-2l bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent font-bold mb-8 shadow-lg text-center">
            Please enter the url in this box below.
          </p>

        {/* URL Input Box */}

        <div className="w-full max-w-md px-4 py-4 bg-transparent rounded-lg">
          <form className="flex flex-col space-y-4">
            <input
            
            type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter URL here..."
              className="w-full p-3 rounded-lg text-black bg-white bg-opacity-80 border-none focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300 ease-in-out"
            
            />
          </form>
        </div>


        {/* Submit Buttons, not done */}
        <div className="flex justify-center items-center">
          
          <div className="px-4 py-2 bg-gradient-to-r from-purple-700 to-blue-700 text-white rounded-lg hover:from-purple-600 hover:to-blue-800 transition">

            <SignInButton mode="modal">Start Scraping</SignInButton>
          </div>
        </div>
      </div>
    </main>
  );
}


