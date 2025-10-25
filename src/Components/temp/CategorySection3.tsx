'use client'

import React from "react";
import Image from "next/image";
import hydraulic from "@/assets/images/product1.png"

const categories = [
  {
    name: "Hydraulic Cylinders",
    image: hydraulic,
    link: "/products/cylinders",
    description: "Precision engineered cylinders",
  },
  {
    name: "Hydraulic Pumps",
    image: hydraulic,
    link: "/products/pumps",
    description: "High-performance pumps",
  },
  {
    name: "Hydraulic Valves",
    image: hydraulic,
    link: "/products/valves",
    description: "Control & flow solutions",
  },
  {
    name: "Accessories",
    image: hydraulic,
    link: "/products/accessories",
    description: "Complete your system",
  },
  {
    name: "Accessories",
    image: hydraulic,
    link: "/products/accessories",
    description: "Essential components",
  },
];

export default function CategorySection3() {
  return (
    <section className="py-20 bg-white my-8 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-orange-100 rounded-full blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-30 translate-x-1/2 translate-y-1/2"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative">
        
        {/* Minimal Header */}
        <div className="mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-3">
            Shop by Category
          </h2>
          <div className="w-20 h-1.5 bg-gradient-to-r from-orange-500 to-blue-500 rounded-full"></div>
        </div>

        {/* Staggered Bento Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {categories.map((cat, idx) => (
            <a
              href={cat.link}
              key={idx}
              className={`group relative bg-gradient-to-br from-white to-gray-50 rounded-3xl p-6 border-2 border-gray-200 hover:border-orange-400 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 ${
                idx === 0 ? 'md:col-span-2 md:row-span-1' : ''
              }`}
            >
              {/* Floating Badge */}
              <div className="absolute -top-3 -right-3 w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform rotate-12 group-hover:rotate-0">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </div>

              <div className="flex flex-col h-full">
                {/* Image Container with Hexagon-like Effect */}
                <div className="relative mb-6 flex justify-center">
                  <div className="relative w-24 h-24 bg-gradient-to-br from-orange-50 via-orange-100 to-blue-50 rounded-2xl rotate-45 group-hover:rotate-[50deg] transition-all duration-500 flex items-center justify-center shadow-inner">
                    <div className="-rotate-45 group-hover:-rotate-[50deg] transition-all duration-500 w-16 h-16">
                      <Image
                        src={cat.image}
                        alt={cat.name}
                        className="object-contain w-full h-full"
                      />
                    </div>
                  </div>
                </div>

                {/* Text Content */}
                <div className="flex-1 text-center">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors duration-300">
                    {cat.name}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                {/* Animated Underline */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <span className="text-sm font-medium text-orange-500 group-hover:text-orange-600 flex items-center justify-center gap-2">
                    View All
                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}