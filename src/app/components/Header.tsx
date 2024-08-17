import { SignedOut, SignInButton, SignedIn, UserButton } from '@clerk/nextjs';
import React from 'react';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 p-4 bg-transparent text-white flex justify-between items-center z-50">
      <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent">

      Scrapetastic
      </h1>

      <div className="flex items-center space-x-4">
        <SignedOut>


          <div className="px-4 py-2 bg-gradient-to-r from-purple-700 to-blue-700 text-white rounded-lg hover:from-purple-600 hover:to-blue-800 transition">
            <SignInButton mode="modal">Log in</SignInButton>
          </div>


        </SignedOut>

        <SignedIn>

          <div className="px-4 py-2 bg-gradient-to-r from-purple-700 to-blue-700 text-white rounded-lg hover:from-purple-600 hover:to-blue-800 transition">
            <UserButton showName />
          </div>


        </SignedIn>

      </div>
    </header>
  );
}
