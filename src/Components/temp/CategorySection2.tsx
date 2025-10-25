'use client'

import React from "react";
import Image from "next/image";
import hydraulic from "@/assets/images/product1.png"

const categories = [
  {
    name: "Hydraulic Cylinders",
    image: hydraulic,
    link: "/products/cylinders",
    description: "Single & double-acting cylinders for heavy-duty applications",
    specs: "Up to 500 bar",
  },
  {
    name: "Hydraulic Pumps",
    image: hydraulic,
    link: "/products/pumps",
    description: "Gear, piston, and vane pumps for industrial systems",
    specs: "5-500 L/min",
  },
  {
    name: "Hydraulic Valves",
    image: hydraulic,
    link: "/products/valves",
    description: "Directional, pressure, and flow control valves",
    specs: "Industry certified",
  },
  {
    name: "Hydraulic Accessories",
    image: hydraulic,
    link: "/products/accessories",
    description: "Hoses, fittings, filters, and mounting components",
    specs: "Complete solutions",
  },
  {
    name: "Custom Solutions",
    image: hydraulic,
    link: "/products/custom",
    description: "Engineered systems for specialized requirements",
    specs: "Tailored design",
  },
];

export default function CategorySection2() {
  return (
    <section className="py-16 bg-white my-8">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Professional Header */}
        <div className="mb-12 pb-8 border-b-2 border-gray-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-1 h-8 bg-blue-600"></div>
            <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
              Product Categories
            </span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-3">
            Industrial Hydraulic Solutions
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl">
            Comprehensive range of hydraulic components engineered for reliability, performance, and durability in demanding industrial environments.
          </p>
        </div>

        {/* Professional Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, idx) => (
            <a
              href={cat.link}
              key={idx}
              className="group bg-white border-2 border-gray-200 hover:border-blue-600 transition-all duration-300 overflow-hidden"
            >
              {/* Image Section */}
              <div className="relative h-56 bg-gray-50 flex items-center justify-center overflow-hidden">
                {/* Grid Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="w-full h-full" style={{
                    backgroundImage: 'linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)',
                    backgroundSize: '20px 20px'
                  }}></div>
                </div>
                
                {/* Category Number */}
                <div className="absolute top-4 left-4 w-10 h-10 bg-gray-900 text-white flex items-center justify-center font-bold text-sm">
                  {String(idx + 1).padStart(2, '0')}
                </div>

                {/* Product Image */}
                <div className="relative w-40 h-40 z-10 transform group-hover:scale-105 transition-transform duration-500">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    className="object-contain w-full h-full"
                  />
                </div>

                {/* Blue Accent Bar */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </div>

              {/* Content Section */}
              <div className="p-6">
                {/* Category Name */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                  {cat.name}
                </h3>

              

                {/* Specs Badge */}
                <div className="flex items-center justify-between">
                  <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-xs font-semibold uppercase tracking-wide">
                    {cat.specs}
                  </span>

                  {/* Arrow Link */}
                  <div className="flex items-center gap-2 text-sm font-semibold text-blue-600 group-hover:gap-3 transition-all duration-300">
                    <span>View Products</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Bottom Info Bar */}
        <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">500+</div>
              <div className="text-sm text-gray-600 mt-1">Products</div>
            </div>
            <div className="w-px h-12 bg-gray-300"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">ISO 9001</div>
              <div className="text-sm text-gray-600 mt-1">Certified</div>
            </div>
            <div className="w-px h-12 bg-gray-300"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">24/7</div>
              <div className="text-sm text-gray-600 mt-1">Support</div>
            </div>
          </div>
          
          <a href="/catalog" className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors duration-300 flex items-center gap-2">
            <span>Download Catalog</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}