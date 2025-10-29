"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { ArrowRight, Minus, Plus, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import AddToCartButton from "@/Components/Button/AddToCartButton";

export default function ProductDetailPage() {
  const { pathUrl } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (pathUrl) fetchProduct();
  }, [pathUrl]);

  const fetchProduct = async () => {
    try {
      const res = await axios.get(`/api/product/${pathUrl}`);
      if (res.data.success) {
        setProduct(res.data.data);
      } else {
        toast.error("Product not found");
      }
    } catch (err) {
      console.error("Error fetching product:", err);
      toast.error("Failed to load product");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-neutral-100">
        <Loader2 className="animate-spin text-gray-500" size={32} />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-neutral-100">
        <p className="text-gray-600 text-lg">Product not found.</p>
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-screen bg-neutral-100">
      <div className="min-h-screen max-w-screen-2xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-0">
          {/* Product Images */}
          <div className="p-8 md:p-12 bg-white">
            <div className="aspect-square bg-gray-50 overflow-hidden">
              <img
                src={product.images?.[selectedImage] || product.thumbnail}
                alt={`${product.name} view ${selectedImage + 1}`}
                className="w-full h-full object-cover"
              />
            </div>

            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-3 mt-4">
                {product.images.map((img: string, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`aspect-square overflow-hidden transition-all ${
                      selectedImage === idx
                        ? "ring-2 ring-gray-900 ring-offset-2"
                        : "opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="p-8 md:p-12 flex flex-col justify-between">
            <div className="space-y-8">
              {product.code && (
                <div className="text-xs tracking-[0.3em] text-gray-500 uppercase">
                  {product.code}
                </div>
              )}

              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3 leading-tight">
                  {product.name}
                </h1>
                {product.subtitle && (
                  <p className="text-lg text-gray-600">{product.subtitle}</p>
                )}
              </div>

              <div className="py-6 border-y border-gray-300">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold font-sans text-gray-900">
                    ₹{" "}
                    {product.discountPrice
                      ? product.discountPrice.toLocaleString()
                      : product.price?.toLocaleString()}
                  </span>
                  {product.discountPrice && (
                    <span className="text-gray-400 line-through font-sans text-lg">
                      ₹{product.price?.toLocaleString()}
                    </span>
                  )}
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="space-y-3">
                <div className="text-sm text-gray-600 uppercase tracking-wider">
                  Quantity
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 border border-gray-300 flex items-center justify-center hover:bg-gray-900 hover:text-white transition-all"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="text-xl font-medium text-gray-900 w-12 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 border border-gray-300 flex items-center justify-center hover:bg-gray-900 hover:text-white transition-all"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              {/* Add to Cart */}
              <div className="space-y-3 pt-4">
                {/* <AddToCartButton product={product} /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
