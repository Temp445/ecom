'use client'

import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Link from "next/link";



export default function CategorySection() {

     const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/category");
      setCategories(res.data.data || []);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <section className="py-10 bg-gray-900">
      <div className="container mx-auto px-4 2xl:px-0">
        

        <div className="flex justify-center gap-6">
          {categories.slice(0,6).map((cat) => (
            <Link
              href={`/category/${encodeURIComponent(cat.Name)}`}
              key={cat._id}
              className="group flex flex-col items-center justify-center"
            >
              <div className="relative w-full h-56 aspect-square bg-gray-50 border-2 border-gray-200  rounded-xl transition-all duration-300 flex items-center justify-center mb-4 overflow-hidden">
                <div className="relative w-3/4 h-3/4 transform group-hover:scale-110 transition-transform duration-500">
                  <img
                    src={cat.CatImage}
                    alt={cat.Name}
                    className="object-contain w-full h-full"
                  />
                </div>
                
              </div>

              <h3 className="text-sm font-semibold text-white text-center transition-colors duration-300 leading-tight">
                {cat.Name}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}