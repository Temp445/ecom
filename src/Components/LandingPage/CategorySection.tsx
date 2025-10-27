'use client'

import React from "react";
import Image from "next/image";
import hydraulic from "@/assets/Category/single_acting_hydraulic.png"
import double from "@/assets/Category/double_acting_hydraulic.png"
import tie_rod from "@/assets/Category/tie_rod.png"
import welded from "@/assets/Category/Welded.png"
import telescopic from "@/assets/Category/telescopic.png"

const categories = [
  {
    name: "Single Acting Hydraulic Cylinder",
    image: hydraulic,
    link: "/products/cylinders",
  },
  {
    name: "Double Acting Hydraulic Cylinder",
    image: double,
    link: "/products/pumps",
  },
  {
    name: "Tie Rod Hydraulic Cylinder",
    image: tie_rod,
    link: "/products/valves",
  },
  {
    name: "Telescopic Hydraulic Cylinder",
    image: telescopic,
    link: "/products/accessories",
  },
  {
    name: "Welded Body Hydraulic Cylinder",
    image: welded,
    link: "/products/power-units",
  }
];

export default function CategorySection() {
  return (
    <section className="py-10 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 2xl:px-0">
        

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {categories.map((cat, idx) => (
            <a
              href={cat.link}
              key={idx}
              className="group flex flex-col items-center"
            >
              <div className="relative w-full aspect-square bg-gray-50 border-2 border-gray-200  rounded-xl transition-all duration-300 flex items-center justify-center mb-4 overflow-hidden">
                <div className="relative w-3/4 h-3/4 transform group-hover:scale-110 transition-transform duration-500">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    className="object-contain w-full h-full"
                  />
                </div>
                
              </div>

              <h3 className="text-sm font-semibold text-white text-center transition-colors duration-300 leading-tight">
                {cat.name}
              </h3>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}