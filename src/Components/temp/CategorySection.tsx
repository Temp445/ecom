'use client'

import React from "react";
import Image from "next/image";
import hydraulic from "@/assets/images/product1.png"

const categories = [
  {
    name: "Hydraulic Cylinders",
    image: hydraulic,
    link: "/products/cylinders",
    code: "HC-Series",
    applications: "Construction, Mining, Agriculture",
  },
  {
    name: "Hydraulic Pumps",
    image: hydraulic,
    link: "/products/pumps",
    code: "HP-Series",
    applications: "Manufacturing, Material Handling",
  },
  {
    name: "Hydraulic Valves",
    image: hydraulic,
    link: "/products/valves",
    code: "HV-Series",
    applications: "Process Control, Automation",
  },
  {
    name: "Accessories",
    image: hydraulic,
    link: "/products/accessories",
    code: "HA-Series",
    applications: "System Integration, Maintenance",
  },
  {
    name: "Power Units",
    image: hydraulic,
    link: "/products/power-units",
    code: "PU-Series",
    applications: "Mobile & Stationary Systems",
  },
];

export default function CategorySection() {
  return (
    <section className="py-20 bg-gray-50 my-8">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header with Sidebar Style */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="inline-block px-4 py-2 bg-orange-100 text-orange-800 text-xs font-bold uppercase tracking-wider mb-4">
                Products
              </div>
              <h2 className="text-5xl font-bold text-gray-900 mb-4 leading-tight">
                Product<br/>Categories
              </h2>
              <p className="text-gray-600 mb-6">
                Professional-grade hydraulic components for industrial applications
              </p>
              <div className="w-16 h-1 bg-orange-600"></div>
            </div>
          </div>

          {/* Category Cards */}
          <div className="lg:col-span-3 space-y-4">
            {categories.map((cat, idx) => (
              <a
                href={cat.link}
                key={idx}
                className="group flex flex-col md:flex-row bg-white hover:bg-gray-50 transition-all duration-300 border-l-4 border-gray-300 hover:border-orange-600 shadow-sm hover:shadow-lg"
              >
                {/* Image Section */}
                <div className="md:w-64 h-48 md:h-auto bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center p-8 relative overflow-hidden">
                  {/* Diagonal Stripe Pattern */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="w-full h-full" style={{
                      backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.1) 10px, rgba(0,0,0,0.1) 20px)'
                    }}></div>
                  </div>

                  <div className="relative w-32 h-32 transform group-hover:scale-110 transition-transform duration-500">
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      className="object-contain w-full h-full"
                    />
                  </div>
                </div>

                {/* Content Section */}
                <div className="flex-1 p-6 md:p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                     
                          <span className="text-2xl flex items-end font-bold text-gray-400">
                            {String(idx + 1).padStart(2, '0')}
                          </span>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors duration-300">
                          {cat.name}
                        </h3>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                        Applications
                      </div>
                      <p className="text-sm text-gray-700">
                        {cat.applications}
                      </p>
                    </div>
                  </div>

                  {/* Bottom Action Bar */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Datasheet
                      </span>
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Technical Specs
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-sm font-semibold text-orange-600 group-hover:gap-3 transition-all duration-300">
                      <span>Explore Range</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}