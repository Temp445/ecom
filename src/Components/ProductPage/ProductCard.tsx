import React from "react";
import { useRouter } from "next/navigation";
import AddToCartButton from "@/Components/Button/AddToCartButton";

export default function ProductCard({
  product,
  viewMode,
  userId,
}: {
  product: any;
  viewMode: "grid" | "list";
  userId?: string;
}) {
  const router = useRouter();

  return (
    <div
      className={`bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group ${
        viewMode === "list" ? "flex" : "flex flex-col"
      }`}
    >
      <div
        onClick={() => router.push(`/products/${product.pathUrl}`)}
        className={`bg-gradient-to-br from-slate-100 to-slate-50 cursor-pointer overflow-hidden ${
          viewMode === "list" ? "w-48 h-48" : "aspect-square"
        }`}
      >
        {product.thumbnail ? (
          <img
            src={product.thumbnail || product.images?.[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-slate-400">
            <span className="text-4xl">📦</span>
          </div>
        )}
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <h2
          onClick={() => router.push(`/products/${product.pathUrl}`)}
          className="text-lg font-semibold text-slate-800 mb-2 cursor-pointer hover:text-blue-600 transition line-clamp-2"
        >
          {product.name}
        </h2>

        <p className="text-sm text-slate-600 mb-4 line-clamp-2 flex-1">
          {product.description || "No description available."}
        </p>

        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-2xl font-bold text-slate-900">
              ₹{(product.discountPrice || product.price)?.toLocaleString()}
            </p>
            {product.discountPrice > 0 && (
              <div className="flex items-center gap-2">
                <p className="text-sm text-slate-400 line-through">
                  ₹{product.price?.toLocaleString()}
                </p>
                <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                  {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% OFF
                </span>
              </div>
            )}
          </div>
        </div>

        <AddToCartButton product={product} userId={userId} />
      </div>
    </div>
  );
}
