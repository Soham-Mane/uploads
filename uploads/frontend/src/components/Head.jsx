import React, { useState } from 'react';
import Logo from "../images/01.svg"; // Assuming you have an SVG version of the logo
import { Link } from "react-router-dom";
import Layout from "../Layout";

const Head = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="sticky top-0 z-50  shadow-md bg-[var(--bg-color)]">
      <nav>
        <div className="max-w-[1140px] xl:mx-auto flex justify-between items-center h-16 px-4 md:px-0">
          {/* Logo Section */}
          <div className="flex items-center px-4">
            <a className="flex items-center" href="/">
              <img src={Logo} className="h-10 hover:scale-105 transition-transform duration-200" alt="Logo" />
            </a>
          </div>

          {/* Hamburger Icon for mobile */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-[var(--text-color)] focus:outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-4">
            <a className="text-[var(--text-color)] hover:text-[var(--accent-color)]" href="/">Home</a>
            <a className="text-[var(--text-color)] hover:text-[var(--accent-color)]" href="/schedule">Schedule</a>
            <a className="text-[var(--text-color)] hover:text-[var(--accent-color)]" href="/news">Cricket News</a>
            <a className="text-[var(--text-color)] hover:text-[var(--accent-color)]" href="/series">Series</a>
            <a className="text-[var(--text-color)] hover:text-[var(--accent-color)]" href="/ranking">Ranking</a>
            <a className="text-[var(--text-color)] hover:text-[var(--accent-color)]" href="/table">Points Table</a>
            <a className="text-[var(--text-color)] hover:text-[var(--accent-color)]" href="/teams">Teams</a>
            <a className="text-[var(--text-color)] hover:text-[var(--accent-color)]" href="/wtc">WTC</a>
            <a className="text-[var(--text-color)] hover:text-[var(--accent-color)] flex items-center gap-1" href="/">
              More
              <span>
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em">
                  <path d="M256 294.1L383 167c9.4-9.4 24.6-9.4 33.9 0s9.3 24.6 0 34L273 345c-9.1 9.1-23.7 9.3-33.1.7L95 201.1c-4.7-4.7-7-10.9-7-17s2.3-12.3 7-17c9.4-9.4 24.6-9.4 33.9 0l127.1 127z"></path>
                </svg>
              </span>
            </a>
          </div>

          {/* Login Button */}
          <div className="flex items-center justify-center px-6">
           
            
            
           
            
            
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-[var(--highlight-color)]">
            <a className="block py-2 px-4 text-[var(--text-color)] hover:bg-gray-200" href="/">Home</a>
            <a className="block py-2 px-4 text-[var(--text-color)] hover:bg-gray-200" href="/schedule">Schedule</a>
            <a className="block py-2 px-4 text-[var(--text-color)] hover:bg-gray-200" href="/news">Cricket News</a>
            <a className="block py-2 px-4 text-[var(--text-color)] hover:bg-gray-200" href="/series">Series</a>
            <a className="block py-2 px-4 text-[var(--text-color)] hover:bg-gray-200" href="/ranking">Ranking</a>
            <a className="block py-2 px-4 text-[var(--text-color)] hover:bg-gray-200" href="/table">Points Table</a>
            <a className="block py-2 px-4 text-[var(--text-color)] hover:bg-gray-200" href="/teams">Teams</a>
            <a className="block py-2 px-4 text-[var(--text-color)] hover:bg-gray-200" href="/wtc">WTC</a>
            <a className="block py-2 px-4 text-[var(--text-color)] hover:bg-gray-200 flex items-center gap-1" href="/">
              More
              <span>
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em">
                  <path d="M256 294.1L383 167c9.4-9.4 24.6-9.4 33.9 0s9.3 24.6 0 34L273 345c-9.1 9.1-23.7 9.3-33.1.7L95 201.1c-4.7-4.7-7-10.9-7-17s2.3-12.3 7-17c9.4-9.4 24.6-9.4 33.9 0l127.1 127z"></path>
                </svg>
              </span>
            </a>
            <div className="py-2 px-4 flex-col">
              
             
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Head;
