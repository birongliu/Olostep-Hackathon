"use client";
import React from 'react';
import { useRouter } from 'next/router';

export default function ResultPage() {
  const router = useRouter();
  const { result } = router.query; // Get the result from the query parameters

  const handleScrapAnother = () => {
    router.push('/'); // Redirects back to the home page
  };

  return (
    <main className="relative flex w-full h-screen bg-[url('/img/background.png')] bg-cover bg-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-65"></div>

      <div className="relative flex flex-col justify-center items-center w-full z-10">
        {/* Display Scraped Result */}
        <div className="text-[2rem] md:text-[2rem] bg-white bg-opacity-80 text-black font-bold uppercase mb-4 shadow-lg p-4 rounded-lg">
          {result ? result : 'No data scraped yet.'}
        </div>

        {/* Scrap Another Link Button */}
        <div className="flex justify-center items-center">
          <button
            onClick={handleScrapAnother}
            className="px-4 py-2 bg-gradient-to-r from-purple-700 to-blue-700 text-white rounded-lg hover:from-purple-600 hover:to-blue-800 transition"
          >
            Scrap Another Link
          </button>
        </div>
      </div>
    </main>
  );
}
