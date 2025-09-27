'use client';

import React, { useState } from "react";
import { FiSearch, FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="text-2xl font-bold">
              HydraCylinders
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center">
            <a href="/" className="hover:text-gray-300">
              Home
            </a>
            <a href="/products" className="hover:text-gray-300">
              Products
            </a>
            <a href="/about" className="hover:text-gray-300">
              About
            </a>
            <a href="/contact" className="hover:text-gray-300">
              Contact
            </a>

            {/* Search Button */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="px-3 py-1 rounded-l-md text-black focus:outline-none"
              />
              <button className="bg-blue-600 px-3 py-1 rounded-r-md hover:bg-blue-700">
                <FiSearch />
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-gray-800 px-4 py-2 space-y-2">
          <a href="/" className="block hover:text-gray-300">
            Home
          </a>
          <a href="/products" className="block hover:text-gray-300">
            Products
          </a>
          <a href="/about" className="block hover:text-gray-300">
            About
          </a>
          <a href="/contact" className="block hover:text-gray-300">
            Contact
          </a>
          {/* Mobile Search */}
          <div className="flex mt-2">
            <input
              type="text"
              placeholder="Search..."
              className="px-3 py-1 rounded-l-md text-black w-full"
            />
            <button className="bg-blue-600 px-3 py-1 rounded-r-md hover:bg-blue-700">
              <FiSearch />
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
