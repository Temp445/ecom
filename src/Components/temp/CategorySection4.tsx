'use client'

import React from "react";
import Image from "next/image";
import hydraulic from "@/assets/images/product1.png"

const categories = [
  {
    name: "Hydraulic Cylinders",
    image: hydraulic,
    link: "/products/cylinders",
    pressure: "Up to 700 bar",
    temp: "-40°C to +120°C",
  },
  {
    name: "Hydraulic Pumps",
    image: hydraulic,
    link: "/products/pumps",
    pressure: "Up to 350 bar",
    temp: "-20°C to +80°C",
  },
  {
    name: "Hydraulic Valves",
    image: hydraulic,
    link: "/products/valves",
    pressure: "Up to 420 bar",
    temp: "-30°C to +100°C",
  },
  {
    name: "Hydraulic Accessories",
    image: hydraulic,
    link: "/products/accessories",
    pressure: "Varies by type",
    temp: "Standard range",
  },
  {
    name: "Manifolds & Blocks",
    image: hydraulic,
    link: "/products/manifolds",
    pressure: "Up to 500 bar",
    temp: "-25°C to +90°C",
  },
];

export default function CategorySection4() {
  return (
    <section className="py-20 bg-gradient-to-b from-slate-100 to-white my-8">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Industrial Header */}
        <div className="mb-16 text-center">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-red-600 rounded-full"></div>
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <div className="w-2 h-2 bg-green-600 rounded-full"></div>
            </div>
            <span className="text-xs font-mono font-bold text-gray-500 uppercase tracking-widest">
              System Ready
            </span>
          </div>
          <h2 className="text-5xl font-black text-gray-900 mb-4 tracking-tight">
            PRODUCT RANGE
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Engineered solutions for industrial hydraulic systems
          </p>
        </div>

        {/* Card Grid with Technical Specs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          {categories.map((cat, idx) => (
            <a
              href={cat.link}
              key={idx}
              className="group relative bg-white border-2 border-gray-300 hover:border-slate-700 transition-all duration-300 overflow-hidden"
            >
              {/* Corner Ribbon */}
              <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                <div className="absolute top-3 -right-10 w-32 bg-slate-900 text-white text-center text-[10px] font-bold uppercase tracking-wider py-1 transform rotate-45 shadow-md">
                  New
                </div>
              </div>

              <div className="grid grid-cols-5">
                {/* Left Side - Image */}
                <div className="col-span-2 bg-gradient-to-br from-slate-50 to-slate-100 p-8 flex items-center justify-center relative">
                  {/* Technical Grid Background */}
                  <div className="absolute inset-0 opacity-[0.03]">
                    <div className="w-full h-full" style={{
                      backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
                      backgroundSize: '20px 20px'
                    }}></div>
                  </div>
                  
                  <div className="relative w-32 h-32 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      className="object-contain w-full h-full"
                    />
                  </div>
                </div>

                {/* Right Side - Content */}
                <div className="col-span-3 p-6 flex flex-col justify-between">
                  {/* Header */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 bg-slate-900 text-white flex items-center justify-center text-xs font-bold">
                        {String(idx + 1).padStart(2, '0')}
                      </div>
                      <div className="h-px flex-1 bg-gray-300"></div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-slate-700 transition-colors duration-300">
                      {cat.name}
                    </h3>

                    {/* Technical Specifications */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 font-medium">Max Pressure:</span>
                        <span className="font-mono font-bold text-gray-900">{cat.pressure}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 font-medium">Temp Range:</span>
                        <span className="font-mono font-bold text-gray-900">{cat.temp}</span>
                      </div>
                    </div>
                  </div>

                  {/* Footer Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex gap-3">
                      <button className="w-8 h-8 border border-gray-300 hover:border-slate-700 hover:bg-slate-50 flex items-center justify-center transition-colors duration-200">
                        <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </button>
                      <button className="w-8 h-8 border border-gray-300 hover:border-slate-700 hover:bg-slate-50 flex items-center justify-center transition-colors duration-200">
                        <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                        </svg>
                      </button>
                    </div>

                    <div className="flex items-center gap-2 text-sm font-bold text-slate-700 group-hover:gap-3 transition-all duration-300">
                      <span className="uppercase tracking-wide">View</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Technical Info Footer */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900 text-white p-6 flex items-center gap-4">
            <div className="w-12 h-12 bg-white/10 flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-gray-400 mb-1">Warranty</div>
              <div className="font-bold">2 Years Standard</div>
            </div>
          </div>

          <div className="bg-slate-900 text-white p-6 flex items-center gap-4">
            <div className="w-12 h-12 bg-white/10 flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-gray-400 mb-1">Lead Time</div>
              <div className="font-bold">2-4 Weeks</div>
            </div>
          </div>

          <div className="bg-slate-900 text-white p-6 flex items-center gap-4">
            <div className="w-12 h-12 bg-white/10 flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-gray-400 mb-1">Support</div>
              <div className="font-bold">24/7 Available</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}





"use client";

import { useState } from "react";
import { CircleUserRound, LogOut, LogIn, UserPlus, MapPin, Package, ChevronDown, User } from "lucide-react";

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Demo state - replace with your useAuth hook
  const user = { firstName: "John", _id: "123" }; // Set to null to see logged out state
  const isLoggedIn = !!user;

  const handleLogout = () => {
    console.log("Logout");
    // logout();
    // router.push("/login");
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 border border-gray-200 transition-all duration-300 hover:shadow-md group"
      >
        {isLoggedIn ? (
          <div className="flex gap-2 items-center">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm shadow-sm">
              {user?.firstName?.charAt(0) || "U"}
            </div>
            <span className="font-medium text-gray-800">{user?.firstName || "User"}</span>
            <ChevronDown
              className={`w-4 h-4 text-gray-600 transition-transform duration-300 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </div>
        ) : (
          <div className="flex gap-2 items-center">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
              <CircleUserRound className="w-5 h-5 text-white" />
            </div>
            <span className="font-medium text-gray-800">Login</span>
            <ChevronDown
              className={`w-4 h-4 text-gray-600 transition-transform duration-300 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </div>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-2xl shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          {isLoggedIn ? (
            <>
              <div className="px-4 py-3 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-md">
                    {user?.firstName?.charAt(0) || "U"}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{user?.firstName || "User"}</p>
                    <p className="text-xs text-gray-500">Manage your account</p>
                  </div>
                </div>
              </div>

              <div className="py-1">
                <a
                  href={`/user-profile/${user?._id}`}
                  className="flex items-center px-4 py-2.5 text-gray-700 text-sm hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-200 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center mr-3 group-hover:bg-blue-200 transition-colors">
                    <User className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="font-medium">My Profile</span>
                </a>

                <a
                  href="/addresses"
                  className="flex items-center px-4 py-2.5 text-gray-700 text-sm hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 transition-all duration-200 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center mr-3 group-hover:bg-green-200 transition-colors">
                    <MapPin className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="font-medium">Addresses</span>
                </a>

                <a
                  href="/orders"
                  className="flex items-center px-4 py-2.5 text-gray-700 text-sm hover:bg-gradient-to-r hover:from-orange-50 hover:to-amber-50 transition-all duration-200 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center mr-3 group-hover:bg-orange-200 transition-colors">
                    <Package className="w-4 h-4 text-orange-600" />
                  </div>
                  <span className="font-medium">My Orders</span>
                </a>
              </div>

              <div className="border-t border-gray-100 my-1" />

              <button
                onClick={handleLogout}
                className="w-full text-left flex items-center px-4 py-2.5 text-red-600 text-sm hover:bg-red-50 transition-all duration-200 group"
              >
                <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center mr-3 group-hover:bg-red-200 transition-colors">
                  <LogOut className="w-4 h-4 text-red-600" />
                </div>
                <span className="font-medium">Logout</span>
              </button>
            </>
          ) : (
            <div className="py-1">
              <a
                href="/register"
                className="flex items-center px-4 py-2.5 text-gray-700 text-sm hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 transition-all duration-200 group"
              >
                <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center mr-3 group-hover:bg-purple-200 transition-colors">
                  <UserPlus className="w-4 h-4 text-purple-600" />
                </div>
                <span className="font-medium">Sign Up</span>
              </a>

              <a
                href="/login"
                className="flex items-center px-4 py-2.5 text-gray-700 text-sm hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200 group"
              >
                <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center mr-3 group-hover:bg-blue-200 transition-colors">
                  <LogIn className="w-4 h-4 text-blue-600" />
                </div>
                <span className="font-medium">Login</span>
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserMenu;