"use client";

import { useRouter } from 'next/navigation'; 

export default function ResultPage() {
  const router = useRouter(); 

  const handleScrapAnother = () => {
    router.push('/urlPage'); // Navigate to /urlPage
  };
  return (
    <main className="relative flex w-full h-screen bg-[url('/img/background.png')] bg-cover bg-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-15"></div>

      <div className="relative flex flex-col justify-center items-center w-full z-10 px-4 md:px-8 lg:px-16">

        {/* Display Scraped Result */}


        {/* Scrap Another Link Button */}
        <div className="px-4 py-2 bg-gradient-to-r from-purple-700 to-blue-700 text-white rounded-lg hover:from-purple-600 hover:to-blue-800 transition">
          <button
            onClick={handleScrapAnother}
             className="w-full h-full"
          >
            Scrap Another Link
            
          </button>
        </div>
      </div>
    </main>
  );
}

