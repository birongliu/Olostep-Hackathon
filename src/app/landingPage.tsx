"use client";

import { useState } from 'react';
import { SignInButton } from '@clerk/nextjs';

const InfoPage: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here
    alert('Form submitted!');
  };

  return (
    <div className="relative w-full min-h-screen bg-gray-900 text-white">
      
      <div className="relative flex w-full h-screen bg-[url('/img/background.png')] bg-cover bg-center">
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-15"></div>

      <div className="relative flex flex-col justify-center items-center w-full z-10 px-4 md:px-8 lg:px-16">
        
      {/* "Welcome to" with dot SVG */}

      <section className="flex flex-col items-center mb-16 text-center">
          <div className="relative uppercase tracking-widest text-md bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent font-bold mb-4 flex items-center">
          
          {/* Dot SVG */}

          <div className="flex space-x-3 md:space-x-4 lg:space-x-5">

            <svg className="text-purple-600 " width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="4" fill="currentColor"/>
            </svg>

            <svg className="text-purple-500" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="4" fill="currentColor"/>
            </svg>

            <svg className="text-purple-400 mr-2" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="4" fill="currentColor"/>
            </svg>

          </div>

          {/* "Welcome to" Text */}
          <span className="ml-2 md:ml-4 mr-2 md:mr-4 text-sm md:text-base lg:text-lg xl:text-xl bg-gradient-to-r from-purple-700 via-red-600 to-pink-600 bg-clip-text text-transparent font-bold uppercase">
            Welcome to
          </span>
          
          <div className="flex space-x-3 md:space-x-4 lg:space-x-5">
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
        </div>
        
        {/* "SScrapetastic" */}
        <div className="text-[3rem] md:text-[5rem] lg:text-[6rem] xl:text-[7rem] bg-gradient-to-r from-purple-700 via-red-600 to-pink-500 bg-clip-text text-transparent font-bold uppercase mb-4 px-4 md:px-6 lg:px-8 text-center">
          Scrapetastic
        </div>


        {/* Buttons */}
        <div className="flex justify-center items-center">
          <div className="px-4 py-3 bg-gradient-to-r from-purple-700 to-blue-700 text-white rounded-lg hover:from-purple-600 hover:to-blue-800 transition">
            <SignInButton mode="modal">Start Scraping</SignInButton>
          </div>
        </div>

      </section>
      
        </div>
      </div>

      {/* Description Section */}
      <section className="relative flex flex-col items-center w-full py-16 md:py-24 lg:py-32 bg-white">
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-center text-blue-900">
             
             What is Scrapetastic?
         
          </h2>

          <p className="text-center max-w-full md:max-w-2xl lg:max-w-3xl text-lg md:text-xl leading-relaxed text-gray-800 px-4">
              
              Scrapetastic is your go-to tool for transforming any webpage into valuable data with ease. Simply provide a URL, and our platform will effortlessly scrape the content, 
              store it, and display it for you to explore. Whether you're a developer, researcher, or just curious, Scrapetastic makes web scraping simple and accessible.
              Stay tuned for updates as we continuously improve our platform through regular updates and enhancements.
          
          </p>
      </section>





      {/* Creator Section */}
      <section id="creators" className="py-32 bg-gradient-to-r from-purple-800 via-blue-800 to-purple-800 text-white">
     
        <div className="container mx-auto px-6">
     
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Who are we?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
     
     
            {/* Creator 1 */}
            <div className="flex flex-col items-center text-center mb-12 ">
     
              <div className="mb-8">
                <img className="inline-block rounded-md" loading="lazy" src="/img/background.png" alt="Creator 1" />
              </div>
     
              <div className="mb-4">
     
                <strong className="text-2xl md:text-3xl block mb-2">Pranitha Ramaswamy</strong>
                <span className="text-xl block tracking-wide text-gray-400 text-opacity-70 mb-4">UI/UX Designer</span>
                <span className="inline-block w-16 h-1 bg-gray-700"></span>
     
              </div>
     
              <div className="text-gray-200">
                "blah blah blah"
              </div>
            </div>

            {/* Creator 2 */}
            <div className="flex flex-col items-center text-center mb-12">
     
              <div className="mb-8">
                <img className="inline-block rounded-md" loading="lazy" src="/img/background.png" alt="Creator 2" />
              </div>
     
              <div className="mb-4">
     
     
                <strong className="text-2xl md:text-3xl block mb-2">Minh Le</strong>
                <span className="text-xl block tracking-wide text-gray-400 text-opacity-70 mb-4">Front-End Developer</span>
                <span className="inline-block w-16 h-1 bg-gray-700"></span>
     
              </div>
     
              <div className="text-gray-200">
                "blah blah blah"
     
              </div>
     
            </div>

            {/* Creator 3 */}
            <div className="flex flex-col items-center text-center mb-12">
     
              <div className="mb-8">
     
                <img className="inline-block rounded-md" loading="lazy" src="/img/background.png" alt="Creator 3" />
              </div>
     
              <div className="mb-4">
     
                <strong className="text-2xl md:text-3xl block mb-2">Bi Rong Liu</strong>
                <span className="text-xl block tracking-wide text-gray-400 text-opacity-70 mb-4">Back-End Developer</span>
                <span className="inline-block w-16 h-1 bg-gray-700"></span>
     
              </div>
     
              <div className="text-gray-200">
     
                "blah blah blah"

              </div>
            </div>

            {/* Creator 4 */}
            <div className="flex flex-col items-center text-center mb-12">
     
              <div className="mb-8">
     
                <img className="inline-block rounded-md" loading="lazy" src="/img/background.png" alt="Creator 4" />
     
              </div>
     
              <div className="mb-4">
     
                <strong className="text-2xl md:text-3xl block mb-2">Asmaa Hadar</strong>
                <span className="text-xl block tracking-wide text-gray-400 text-opacity-70 mb-4">Full-Stack Developer</span>
                <span className="inline-block w-16 h-1 bg-gray-700"></span>
     
              </div>
              <div className="text-gray-200">
     
                "blah blah blah"
              </div>
     
            </div>
     
          </div>
     
        </div>
     
      </section>




    </div>
  );
};

export default InfoPage;
