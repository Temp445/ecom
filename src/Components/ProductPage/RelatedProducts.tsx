"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { Loader2 } from "lucide-react";

interface RelatedProductsProps {
  categoryId: string;
  currentProductId: string;
}

export default function RelatedProducts({
  categoryId,
  currentProductId,
}: RelatedProductsProps) {
  const [related, setRelated] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (categoryId) fetchRelatedProducts();
  }, [categoryId]);

  const fetchRelatedProducts = async () => {
    try {
      const res = await axios.get(`/api/category/${categoryId}`);
      const filtered = res.data.data.filter(
        (p: any) => p._id !== currentProductId
      );
      setRelated(filtered);
    } catch (err) {
      console.error("Error fetching related products:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="animate-spin text-gray-400" size={28} />
      </div>
    );

  if (!related.length) return null;

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Related Products
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {related.map((item) => (
          <Link
            key={item._id}
            href={`/products/${item.pathUrl}`}
            className="group border border-gray-300 rounded-xl p-4 bg-white hover:shadow-md transition"
          >
            <div className="relative w-full aspect-square mb-3">
              <img
                src={item.images?.[0] || item.thumbnail || "/placeholder.jpg"}
                alt={item.name}
                className="rounded-lg object-cover group-hover:scale-105 transition-transform"
              />
            </div>
            <h3 className="font-medium text-gray-800 group-hover:text-blue-600 text-sm">
              {item.name}
            </h3>
             <p className="line-clamp-2 text-sm">{item.description}</p>
            <p className="text-blue-600 font-semibold mt-1 text-sm">
              ₹{item.price.toLocaleString()}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
