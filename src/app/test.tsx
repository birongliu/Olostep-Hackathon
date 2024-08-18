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
      <div className="absolute inset-0 bg-black opacity-65"></div>

      <div className="relative flex flex-col justify-center items-center w-full z-10 px-4 md:px-8 lg:px-16">

      {/* "Welcome to" with dot SVG */}

      <section className="flex flex-col items-center mb-16 text-center">
          <div className="relative uppercase tracking-widest text-md bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent font-bold mb-4 flex items-center">

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
        <div className="text-[3rem] md:text-[5rem] lg:text-[6rem] xl:text-[7rem] bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent font-bold uppercase mb-4 px-4 md:px-6 lg:px-8 text-center">
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
      <section className="relative flex flex-col items-center w-full py-16 bg-blue-900 bg-opacity-90">
        <h2 className="text-4xl font-bold mb-6">About Scrapetastic</h2>
        <p className="text-center max-w-2xl text-lg leading-relaxed">
          Scrapetastic is your go-to platform for turning any webpage into actionable data with just a click.
          Our tool simplifies web scraping, making it accessible to everyone from developers to data enthusiasts.
        </p>
      </section>
    </div>
  );
};

export default InfoPage;
