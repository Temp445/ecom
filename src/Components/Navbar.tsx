'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, Menu, X, Search, User, Bell } from 'lucide-react';
import Logo from "@/assets/images/AceLogo.png"
import Image from 'next/image';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Products' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
    { href: '/blog', label: 'Blog' },
  ];

  return (
    <nav className="bg-white sticky top-0 z-50 border-b border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-0 xl:px-6">
        <div className="flex justify-between items-center py-0.5">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 flex-shrink-0">
            <div className="   flex items-center justify-center">
              <Image src={Logo} alt="logo" className='' width={42} height={42} />
            </div>
            <span className="font-semibold text-xl text-gray-900 hidden sm:inline">ACE Hydraulic</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-900 transition-colors duration-200 font-medium text-sm relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-900 rounded-full group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-3 lg:space-x-5">
            {/* Search - Desktop */}
            <div className="hidden md:flex items-center">
              <div className="flex items-center bg-gray-50 rounded-full px-4 py-2 border border-gray-200 hover:border-gray-900 transition-colors focus-within:ring-2 focus-within:ring-blue-200">
                <Search className="w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-transparent ml-2 text-gray-700 placeholder-gray-400 focus:outline-none text-sm w-44"
                />
              </div>
            </div>

            <Link href="/account" className="hidden sm:flex p-2.5 text-gray-700 hover:bg-gray-200 hover:text-gray-900 rounded-full transition-colors">
              <User className="w-6 h-6" />
            </Link>

            <Link href="/cart" className="relative  text-gray-700  hover:text-gray-900 rounded-full transition-colors group">
              <ShoppingCart className="w-6 h-6 transition-transform" />
              <span className="absolute -top-1 -right-1 bg-gray-800 text-white text-xs font-bold rounded-full px-1 h-fit flex items-center justify-center shadow-lg">
                0
              </span>
            </Link>

            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="md:hidden p-2.5 text-gray-700 hover:bg-blue-50 hover:text-blue-500 rounded-full transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2.5 text-gray-700 hover:bg-blue-50 hover:text-blue-500 rounded-full transition-colors"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {isSearchOpen && (
          <div className="md:hidden pb-4 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex items-center bg-gray-50 rounded-full px-4 py-2.5 border border-gray-200">
              <Search className="w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                className="bg-transparent ml-2 text-gray-700 placeholder-gray-400 focus:outline-none text-sm flex-1"
              />
            </div>
          </div>
        )}

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="lg:hidden pb-4 space-y-1 animate-in fade-in slide-in-from-top-2 duration-200">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-500 rounded-lg transition-colors font-medium text-sm"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 space-y-1 border-t border-gray-100">
              <Link
                href="/account"
                className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-500 rounded-lg transition-colors font-medium text-sm sm:hidden"
                onClick={() => setIsOpen(false)}
              >
                My Account
              </Link>
              <Link
                href="/notifications"
                className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-500 rounded-lg transition-colors font-medium text-sm sm:hidden"
                onClick={() => setIsOpen(false)}
              >
                Notifications
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}