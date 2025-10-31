"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { Minus, Plus, Loader2 } from "lucide-react";
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
      <div className="max-w-screen-2xl mx-auto py-12 px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-10 bg-white p-6 rounded-2xl shadow-sm">
          <div>
            <div className="aspect-square bg-gray-50 overflow-hidden rounded-xl">
              <img
                src={product.images?.[selectedImage] || product.thumbnail}
                alt={`${product.name} image ${selectedImage + 1}`}
                className="w-full h-full object-cover"
              />
            </div>

            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-3 mt-4">
                {product.images.map((img: string, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`aspect-square overflow-hidden rounded-md border ${
                      selectedImage === idx
                        ? "border-gray-900 ring-2 ring-gray-900"
                        : "border-gray-200 hover:border-gray-400"
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

          <div className="flex flex-col justify-between space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">{product.name}</h1>
              {product.brand && (
                <p className="text-lg text-gray-600 mt-1">by {product.brand}</p>
              )}
            </div>

            <div className="border-y border-gray-300 py-4">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-semibold text-gray-900">
                  ₹{" "}
                  {product.discountPrice
                    ? product.discountPrice.toLocaleString()
                    : product.price?.toLocaleString()}
                </span>
                {product.discountPrice && (
                  <span className="text-gray-400 line-through text-lg">
                    ₹{product.price?.toLocaleString()}
                  </span>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-sm text-gray-600 uppercase tracking-wider mb-1">
                Availability
              </h3>
              <p
                className={`font-medium ${
                  product.stock > 0 ? "text-green-600" : "text-red-500"
                }`}
              >
                {product.stock > 0
                  ? `${product.stock} items in stock`
                  : "Out of stock"}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {product.model && (
                <div>
                  <h3 className="text-sm text-gray-600 uppercase tracking-wider mb-1">
                    Model
                  </h3>
                  <p className="text-gray-800">{product.model}</p>
                </div>
              )}
              {product.category && (
                <div>
                  <h3 className="text-sm text-gray-600 uppercase tracking-wider mb-1">
                    Category
                  </h3>
                  <p className="text-gray-800">
                    {product.category?.Name || product.category}
                  </p>
                </div>
              )}
            </div>

            {product.description && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Description
                </h3>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {product.description}
                </p>
              </div>
            )}

            {/* Quantity */}
            <div>
              <h3 className="text-sm text-gray-600 uppercase tracking-wider mb-1">
                Quantity
              </h3>
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
            <div className="pt-4">
              <AddToCartButton product={product} quantity={quantity} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
