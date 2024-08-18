"use client";

import { useState } from 'react';
import { SignInButton } from '@clerk/nextjs';
import Image from 'next/image';

const InfoPage: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [messageState, setMessageState] = useState({
    success: false,
    error: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setMessageState({ success: true, error: false });
        form.reset(); // Resetting the form fields

        // Resetting the state
        setFormState({
          name: '',
          email: '',
          phone: '',
          message: '',
        });

        setTimeout(() => setMessageState({ success: false, error: false }), 10000);
      } else {
        setMessageState({ success: false, error: true });
        setTimeout(() => setMessageState({ success: false, error: false }), 10000);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setMessageState({ success: false, error: true });
      setTimeout(() => setMessageState({ success: false, error: false }), 10000);
    }
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
              store it, and display it for you to explore. Whether you&apos;re a developer, researcher, or just curious, Scrapetastic makes web scraping simple and accessible.
              Stay tuned for updates as we continuously improve our platform through regular updates and enhancements.
          
          </p>
      </section>





      {/* Creator Section */}
      <section id="creators" className="py-32 bg-gradient-to-r from-purple-800 via-blue-800 to-purple-800 text-white">
     
        <div className="container mx-auto px-6">
     
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Who are we?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
     
     
            {/* Creator 1 */}
            <div className="flex flex-col items-center text-center mb-8 md:mb-10 lg:mb-12">
     
              <div className="mb-6">
              <Image
                className="w-64 h-64 object-cover rounded-md"
                src="/img/creator2.jpg" 
                alt="Creator 1"
                width={256}  
                height={256} 
                loading="lazy"
                style={{ borderRadius: '0.375rem' }} // This is equivalent to `rounded-md`
              />
              </div>
     
              <div className="mb-4">
     
                <strong className="text-1xl md:text-2xl block mb-2">Pranitha Ramaswamy</strong>
                <span className="text-xl block tracking-wide text-gray-400 text-opacity-70 mb-4">UI/UX Designer</span>
                <span className="inline-block w-16 h-1 bg-gray-700"></span>
     
              </div>
     
              <div className="text-gray-200">
                blah blah blah
              </div>
            </div>

            {/* Creator 2 */}
           <div className="flex flex-col items-center text-center mb-8 md:mb-10 lg:mb-12">
     
              <div className="mb-6">
              <Image
                className="w-64 h-64 object-cover rounded-md"
                src="/img/creator1.png" 
                alt="Creator 2"
                width={256}  
                height={256} 
                loading="lazy"
                style={{ borderRadius: '0.375rem' }} // This is equivalent to `rounded-md`
              />
              </div>
     
              <div className="mb-4">
     
     
                <strong className="text-1xl md:text-2xl block mb-2">Minh Le</strong>
                <span className="text-xl block tracking-wide text-gray-400 text-opacity-70 mb-4">Front-End Developer</span>
                <span className="inline-block w-16 h-1 bg-gray-700"></span>
     
              </div>
     
              <div className="text-gray-200">
                blah blah blah
     
              </div>
     
            </div>

            {/* Creator 3 */}
            <div className="flex flex-col items-center text-center mb-8 md:mb-10 lg:mb-12">
     
              <div className="mb-6">
     
              <Image
                className="w-64 h-64 object-cover rounded-md"
                src="/img/creator3.jpg" 
                alt="Creator 3"
                width={256}  
                height={256} 
                loading="lazy"
                style={{ borderRadius: '0.375rem' }} // This is equivalent to `rounded-md`
              />
              </div>
     
              <div className="mb-4">
     
                <strong className="text-1xl md:text-2xl block mb-2">Bi Rong Liu</strong>
                <span className="text-xl block tracking-wide text-gray-400 text-opacity-70 mb-4">Back-End Developer</span>
                <span className="inline-block w-16 h-1 bg-gray-700"></span>
     
              </div>
     
              <div className="text-gray-200">
     
                blah blah blah

              </div>
            </div>

            {/* Creator 4 */}
           <div className="flex flex-col items-center text-center mb-8 md:mb-10 lg:mb-12">
     
              <div className="mb-6">
     
              <Image
                className="w-64 h-64 object-cover rounded-md"
                src="/img/creator4.jpg" 
                alt="Creator 4"
                width={256}  
                height={256} 
                loading="lazy"
                style={{ borderRadius: '0.375rem' }} // This is equivalent to `rounded-md`
              />
     
              </div>
     
              <div className="mb-4">
     
                <strong className="text-1xl md:text-2xl block mb-2">Asmaa Hadar</strong>
                <span className="text-xl block tracking-wide text-gray-400 text-opacity-70 mb-4">Full-Stack Developer</span>
                <span className="inline-block w-16 h-1 bg-gray-700"></span>
     
              </div>
              <div className="text-gray-200">
     
                blah blah blah
              </div>
     
            </div>
     
          </div>
     
        </div>
     
      </section>

    {/* Contact Section */}
    <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-blue-900 mb-4">Contact Us Here</h2>
            <p className="text-lg text-gray-600 mb-8">We&apos;d love to hear from you! Please fill out the form below!</p>
          </div>
          <div className="flex justify-center">
            <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-lg">
              <form id="contactForm" action="https://api.web3forms.com/submit" method="POST" onSubmit={handleSubmit}>
                <input type="hidden" name="access_key" value="42148c10-5248-4af3-b87c-daab30e407b3" />

                {messageState.success && (
                  <div className="text-center mb-3 text-green-600">
                    <div className="font-bold">Form submission successful!</div>
                    Thank you for reaching out. We will get back to you soon!
                  </div>
                )}

                {messageState.error && (
                  <div className="text-center text-red-600 mb-3">
                    Error sending message!
                  </div>
                )}

                <div className="mb-6">
                  <label htmlFor="name" className="block text-lg font-medium mb-2">Full Name</label>
                  <input className="w-full p-3 text-gray-900 bg-gray-100 border border-gray-300 rounded-md" id="name" type="text" name="name" placeholder="Enter your full name" value={formState.name} onChange={handleChange} required />
                </div>

                <div className="mb-6">
                  <label htmlFor="email" className="block text-lg font-medium mb-2">Email Address</label>
                  <input className="w-full p-3 text-gray-900 bg-gray-100 border border-gray-300 rounded-md" id="email" type="email" name="email" placeholder="name@example.com" value={formState.email} onChange={handleChange} required />
                </div>

                <div className="mb-6">
                  <label htmlFor="phone" className="block text-lg font-medium mb-2">Phone Number</label>
                  <input className="w-full p-3 text-gray-900 bg-gray-100  border border-gray-300 rounded-md" id="phone" type="tel" name="phone" placeholder="(123) 456-7890" value={formState.phone} onChange={handleChange} />
                </div>

                <div className="mb-6">
                  <label htmlFor="message" className="block text-lg font-medium mb-2">Message</label>
                  <textarea className="w-full p-3 text-gray-900 bg-gray-100 border border-black-300 rounded-md" id="message" name="message" placeholder="Enter your message here..." style={{ height: '10rem' }} 
                  value={formState.message} onChange={handleChange} required></textarea>
                </div>

                <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />

                <div className="text-center">
                  <button className="mr-4 px-8 py-2 bg-gradient-to-r from-purple-700 to-blue-700 text-white rounded-lg hover:from-purple-600 hover:to-blue-800 transition" type="submit">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InfoPage;
