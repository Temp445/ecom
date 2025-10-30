"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import AddToCartButton from "@/Components/Button/AddToCartButton";
import { useAuth } from "@/context/AuthProvider";

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("/api/product");
      setProducts(res.data.data || []);
    } catch (err) {
      console.error("Error fetching products:", err);
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const handleViewProduct = (pathUrl: string) => {
    router.push(`/products/${pathUrl}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin text-gray-500" size={32} />
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-slate-800 mb-8 text-center">
        Our Products
      </h1>

      {products.length === 0 ? (
        <p className="text-center text-gray-500">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white border rounded-xl shadow-sm hover:shadow-md transition p-4 flex flex-col"
            >
              {/* Product Image */}
              <div
                onClick={() => handleViewProduct(product.pathUrl)}
                className="aspect-square rounded-lg overflow-hidden bg-gray-100 mb-3 cursor-pointer group"
              >
                {product.thumbnail ? (
                  <img
                    src={product.thumbnail}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    No Image
                  </div>
                )}
              </div>

              {/* Product Info */}
              <h2
                onClick={() => handleViewProduct(product.pathUrl)}
                className="text-lg font-semibold text-slate-800 line-clamp-1 mb-1 cursor-pointer hover:text-blue-600"
              >
                {product.name}
              </h2>

              <p className="text-sm text-gray-500 line-clamp-2 mb-2">
                {product.description || "No description available."}
              </p>

              <div className="flex justify-between items-center mb-3">
                <div>
                  <p className="text-slate-800 font-semibold">
                    ₹
                    {product.discountPrice
                      ? product.discountPrice.toLocaleString()
                      : product.price?.toLocaleString()}
                  </p>
                  {product.discountPrice && (
                    <p className="text-gray-400 text-sm line-through">
                      ₹{product.price?.toLocaleString()}
                    </p>
                  )}
                </div>
              </div>

              <AddToCartButton product={product} userId={user?._id} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
