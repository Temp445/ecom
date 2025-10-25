'use client'

import React from "react";
import Image from "next/image";
import hydraulic from "@/assets/images/product1.png"

const categories = [
  {
    name: "Hydraulic Cylinders",
    image: hydraulic,
    link: "/products/cylinders",
  },
  {
    name: "Hydraulic Pumps",
    image: hydraulic,
    link: "/products/pumps",
  },
  {
    name: "Hydraulic Valves",
    image: hydraulic,
    link: "/products/valves",
  },
  {
    name: "Hydraulic Accessories",
    image: hydraulic,
    link: "/products/accessories",
  },
  {
    name: "Power Units",
    image: hydraulic,
    link: "/products/power-units",
  },
  {
    name: "Manifolds",
    image: hydraulic,
    link: "/products/manifolds",
  },
];

export default function CategorySection() {
  return (
    <section className="py-10 bg-white">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        {/* <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Our Category
          </h2>
        </div> */}

        {/* Grid Layout */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((cat, idx) => (
            <a
              href={cat.link}
              key={idx}
              className="group flex flex-col items-center"
            >
              {/* Image Container */}
              <div className="relative w-full aspect-square bg-gray-50 border-2 border-gray-200 group-hover:border-black rounded transition-all duration-300 flex items-center justify-center mb-4 overflow-hidden">
                <div className="relative w-2/4 h-2/4 transform group-hover:scale-110 transition-transform duration-500">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    className="object-contain w-full h-full"
                  />
                </div>
                
                {/* Hover Accent */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </div>

              {/* Title */}
              <h3 className="text-sm font-semibold text-gray-900 text-center group-hover:text-black transition-colors duration-300 leading-tight">
                {cat.name}
              </h3>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}