'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingCart, Menu, X, Search } from 'lucide-react';
import Image from 'next/image';
import Logo from "@/assets/images/AceLogo.png";
import UserMenu from '../Button/UserMenu';
import { useAuth } from '@/context/AuthProvider'; 
import { useCart } from "@/context/CartProvider";
import CartBadge from '../Button/CartBadge';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { user } = useAuth(); 
  // const { cartCount } = useCart();
  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Products' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
    { href: '/blog', label: 'Blog' },
  ];

  const allLinks = user?.role === 'admin'
    ? [...navLinks, { href: '/admin', label: 'Dashboard' }]
    : navLinks;

  return (
    <nav className="bg-white sticky top-0 z-50 border-b border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-2 2xl:px-6">
        <div className="flex justify-between items-center py-0.5">
          <Link href="/" className="flex flex-col items-center space-x-2 flex-shrink-0">
            <div className="flex items-end gap-1 justify-center">
              <Image src={Logo} alt="logo" width={40} height={40} />
              <span className="font-medium text-2xl font-sans text-gray-900 hidden sm:inline">ACE</span>
            </div>
            <span className='ml-3 -mt-1.5 font-medium uppercase text-sm'>Hydraulic</span>
          </Link>

          <div className="hidden lg:flex items-center space-x-8">
            {allLinks.map((link) => (
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

          <div className="flex items-center space-x-3 gap-3 lg:space-x-3">
            <div className="hidden md:flex items-center">
              <div className="flex items-center bg-gray-50 rounded-full px-4 py-2 border border-gray-200 hover:border-gray-900 transition-colors">
                <Search className="w-4 h-4 text-gray-600" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-transparent ml-2 text-gray-700 placeholder-gray-400 focus:outline-none text-sm w-44"
                />
              </div>
            </div>

            <UserMenu />

            {/* <Link href="/cart" className="relative text-gray-800 hover:text-gray-900 rounded-full transition-colors group">
              <ShoppingCart className="w-6 h-6 transition-transform" />
              <span className="absolute -top-1.5 -right-1.5 bg-gray-800 text-white text-xs font-bold rounded-full px-1 h-fit flex items-center justify-center shadow-lg">
                0
              </span>
                {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              {cartCount}
            </span>
          )}
            </Link> */}
            <div> <CartBadge/> </div>

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
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
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

        {isOpen && (
          <div className="lg:hidden pb-4 space-y-1 animate-in fade-in slide-in-from-top-2 duration-200">
            {allLinks.map((link) => (
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
