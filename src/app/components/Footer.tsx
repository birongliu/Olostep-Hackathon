// components/Footer.tsx

import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-purple-700 to-blue-700 text-white py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-center justify-between">
          <div className="text-sm text-gray-200">
            Copyright &copy; Scrapetastic 2024
          </div>
          <div className="mt-2 sm:mt-0 text-sm">
            <a className="mx-2 hover:text-blue-300" href="#!">Privacy</a>
            <span>&middot;</span>
            <a className="mx-2 hover:text-blue-300" href="#!">Terms</a>
            <span>&middot;</span>
            <a className="mx-2 hover:text-blue-300" href="#!">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
