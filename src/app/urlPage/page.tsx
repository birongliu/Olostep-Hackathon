"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function UrlPages() {
  const [url, setUrl] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [endpoints, setEndpoints] = useState<{ allowed: string[], notAllowed: string[] }>({
    allowed: [],
    notAllowed: []
  });
  const router = useRouter(); 

  const handleScraping = () => {
    router.push('/resultPage'); // Navigate to /resultPage
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(`/api/endpoints?search=${encodeURIComponent(searchTerm)}`);
      const data = await response.json();
      setEndpoints(data);
    } catch (error) {
      console.error('Error fetching endpoints:', error);
    }
  };

  return (
    <main className="relative flex w-full h-screen bg-[url('/img/background.png')] bg-cover bg-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-15"></div>

      <div className="relative flex flex-col justify-center items-center w-full z-10 px-4 md:px-8 lg:px-16">
        {/* "Ready to start" */}
        <div className="text-[2rem] md:text-[2.5rem] lg:text-[3rem] xl:text-[3.5rem] bg-gradient-to-r from-purple-700 via-red-600 to-pink-500 bg-clip-text text-transparent font-bold uppercase mb-4 px-4 md:px-6 lg:px-8 text-center">
          Ready to start scrapping?
        </div>

        {/* Description */}
        <p className="relative uppercase tracking-widest text-sm md:text-base lg:text-lg xl:text-xl bg-gradient-to-r from-purple-700 via-red-600 to-pink-600 bg-clip-text text-transparent font-bold mb-6 md:mb-8 lg:mb-10 text-center">
          Please enter the URL in this box below.
        </p>

        {/* URL Input Box */}
        <div className="w-full max-w-md px-4 py-4 bg-transparent rounded-lg">
          <form className="flex flex-col space-y-4">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter url here..."
              className="w-full p-3 rounded-lg text-black bg-white bg-opacity-80 border-none focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300 ease-in-out"
            />

            <button
              onClick={handleScraping}
               className="w-full px-4 py-2 bg-gradient-to-r from-purple-700 to-blue-700 text-white rounded-lg hover:from-purple-600 hover:to-blue-800 transition"
            >
              Start Scraping
            </button>
            
          </form>
        </div>

        {/* Search Input Box */}
        <div className="w-full max-w-md px-4 py-4 bg-transparent rounded-lg">
          <form className="flex flex-col space-y-4">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Enter a a sub url here..."
              className="w-full p-3 rounded-lg text-black bg-white bg-opacity-80 border-none focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300 ease-in-out"
            />
            <button
              onClick={handleSearch}
              className="w-full px-4 py-2 bg-gradient-to-r from-purple-700 to-blue-700 text-white rounded-lg hover:from-purple-600 hover:to-blue-800 transition"
            >
              Search
            </button>
          </form>
        </div>


      </div>
    </main>
  );
}
