'use client'

import React from "react";
import Image from "next/image";
import { ShoppingCart, CircleChevronRight  } from 'lucide-react';
import hydraulic from "@/assets/Category/telescopic.png"

const categories = [
  {
    name: "Hydraulic Cylinders",
    image: hydraulic,
    link: "/products/cylinders",
    capacity: "5 - 500 tonnes",
    material: "Steel",
  },
  {
    name: "Hydraulic Cylinders",
    image: hydraulic,
    link: "/products/pumps",
    capacity: "5 - 500 tonnes",
    material: "Steel",
  },
  {
    name: "Hydraulic Cylinders",
    image: hydraulic,
    link: "/products/valves",
    capacity: "5 - 500 tonnes",
    material: "Steel",
  },
  {
    name: "Hydraulic Cylinders",
    image: hydraulic,
    link: "/products/accessories",
    capacity: "5 - 500 tonnes",
    material: "Steel",
  },
  {
    name: "Hydraulic Cylinders",
    image: hydraulic,
    link: "/products/manifolds",
    capacity: "5 - 500 tonnes",
    material: "Steel",
  },
];

export default function NewProduct() {
  return (
    <section className="py-14 bg-gradient-to-b from-slate-100 to-white">
      <div className="container mx-auto px-6">
        
        <div className="mb-7">
      
          <h2 className=" lg:text-3xl 2xl:text-4xl font-medium text-gray-900 mb-4 tracking-tight">
            Top Selling
          </h2>
         
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6 ">
          {categories.map((cat, idx) => (
            <a
              href={cat.link}
              key={idx}
              className="group relative bg-white rounded-sm border-2 border-gray-300 hover:border-slate-700 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-full h-16 ">
                <div className="absolute top-0 -right-0 w-fit px-4 rounded-bl bg-slate-900 text-white text-center text-[10px] font-bold uppercase tracking-wider py-1 transform rotate- shadow-md">
                  selling
                </div>
              </div>

              <div className="grid grid-cols-5">
                <div className="col-span-2  p-2 flex items-center justify-center relative">
                  
                  <div className="relative w-52 h-52 transform group-hover:scale-125 transition-all duration-500">
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      className="object-contain w-full h-full"
                    />
                  </div>
                </div>

                <div className="col-span-3 p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 bg-slate-900 text-white flex items-center rounded-full justify-center text-xs font-bold">
                        {String(idx + 1).padStart(2, '0')}
                      </div>
                      <div className="h-px flex-1 bg-gray-300"></div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-slate-700 transition-colors duration-300">
                      {cat.name}
                    </h3>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 font-medium">Max Capacity :</span>
                        <span className="font-mono font-bold text-gray-900">{cat.capacity}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 font-medium">Material :</span>
                        <span className="font-mono font-bold text-gray-900">{cat.material}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex gap-3">
                          <button className="w-8 h-8 border border-gray-400 rounded hover:border-slate-700 hover:bg-slate-50 flex items-center justify-center transition-colors duration-200">
                      <ShoppingCart />
                      </button>
                     <div className="flex items-center font-sans">
                        ₹ 5,000
                     </div>
                     <div className="text-xs line-through font-sans ">
                        ₹ 7,000
                     </div>
                    
                    </div>

                    <div className="flex items-center gap-2 text-sm font-bold text-slate-700 group-hover:gap-3 transition-all duration-300">
                   <CircleChevronRight />
                    </div>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}