"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navbarLinks = [
    { href: '/', label: 'Home' },
    { href: '/services', label: 'Services' },
    { href: '/contact', label: 'Contact Us' },
    { href: '/login', label: 'Login' },
  ];

  const css = "text-black mx-4 text-xl font-medium hover:border-b-2 hover:border-blue-500 ease-in-out duration-150 hover:font-bold";

  return (
    <>
      <nav className="bg-gray-200 p-4 flex justify-between items-center border-black ">
        <div className="flex items-center">
          <Image src='/logo.png' alt='logo' width={54} height={10} className="mr-2" />
          <div className="text-3xl"><span className='text-black font-bold'>MEDI</span><span>CARE</span></div>
        </div>

        {/* Responsive Menu Button */}
        <div className="lg:hidden fixed top-0 right-0 p-4">
          <button
            onClick={toggleMenu}
            className="text-blue-500 text-2xl focus:outline-none"
          >
            &#8801; {/* Unicode character for three horizontal lines */}
          </button>

          {/* Responsive Menu */}
          {isMenuOpen && (
            <div className="bg-gray-200 mt-2">
              {navbarLinks.map((link, index) => (
                <a key={index} href={link.href} onClick={closeMenu} className={`block px-4 py-2 ${css}`}>
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Regular Menu for Larger Screens */}
        <div className="hidden lg:flex lg:items-center">
          {navbarLinks.map((link, index) => (
            <a key={index} href={link.href} className={css}>
              {link.label}
            </a>
          ))}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
