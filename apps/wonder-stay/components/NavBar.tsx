import Link from 'next/link';
import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <nav className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            {/* <img className="h-8" src={logo} alt="Logo" /> */}
            <Link className="ml-2 font-bold" href="/">
              My App
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="flex items-center">
              <button className="mx-3 text-gray-300 hover:text-white">
                Button 1
              </button>
              <button className="mx-3 text-gray-300 hover:text-white">
                Button 2
              </button>
              <button className="mx-3 text-gray-300 hover:text-white">
                Button 3
              </button>
            </div>
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(true)}>
              <FaBars className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="mobile-menu bg-gray-900 h-screen">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <img className="h-8" src="" alt="Logo" />
              </div>
              <div className="md:hidden">
                <button onClick={() => setIsMenuOpen(false)}>
                  <FaTimes className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
          <div className="px-4 pt-2">
            <button className="block w-full text-left py-2 text-gray-300 hover:text-white">
              Button 1
            </button>
            <button className="block w-full text-left py-2 text-gray-300 hover:text-white">
              Button 2
            </button>
            <button className="block w-full text-left py-2 text-gray-300 hover:text-white">
              Button 3
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
