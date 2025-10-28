"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Plus,
  Edit3,
  Trash2,
  Loader2,
  Image as ImageIcon,
} from "lucide-react";

const CategoryPage = () => {
  const router = useRouter();
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(
    null
  );

  // Fetch categories
  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/category");
      setCategories(res.data.data);
    } catch (err: any) {
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Failed to load categories",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Delete category
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this category?")) return;
    try {
      setDeletingId(id);
      await axios.delete(`/api/category/${id}`);
      setMessage({ type: "success", text: "Category deleted successfully!" });
      setCategories((prev) => prev.filter((cat) => cat._id !== id));
    } catch (err: any) {
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Failed to delete category.",
      });
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">Categories</h1>
          <Link
            href="/admin/category-upload"
            className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            <Plus className="w-5 h-5 mr-1" /> Add Category
          </Link>
        </div>

        {message && (
          <div
            className={`p-3 rounded-md mb-4 text-center ${
              message.type === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message.text}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center py-10 text-gray-500">
            <Loader2 className="animate-spin mr-2" /> Loading categories...
          </div>
        ) : categories.length === 0 ? (
          <p className="text-center text-gray-500 py-10">
            No categories found. Click “Add Category” to create one.
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.map((cat) => (
              <div
                key={cat._id}
                className="border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition"
              >
                <div className="relative w-full h-40 bg-gray-100 flex items-center justify-center">
                  {cat.CatImage ? (
                    <img
                      src={cat.CatImage}
                      alt={cat.Name}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <ImageIcon className="w-10 h-10 text-gray-400" />
                  )}
                </div>

                <div className="p-4">
                  <h2 className="font-medium text-gray-800 mb-2 text-center">
                    {cat.Name}
                  </h2>

                  <div className="flex items-center justify-center gap-3">
                    {/* Edit */}
                    <Link
                      href={`/admin/category/update/${cat._id}`}
                      className="flex items-center text-sm bg-yellow-400 text-white px-3 py-1.5 rounded-md hover:bg-yellow-500 transition"
                    >
                      <Edit3 className="w-4 h-4 mr-1" /> Edit
                    </Link>

                    {/* Delete */}
                    <button
                      onClick={() => handleDelete(cat._id)}
                      disabled={deletingId === cat._id}
                      className="flex items-center text-sm bg-red-500 text-white px-3 py-1.5 rounded-md hover:bg-red-600 transition disabled:opacity-70"
                    >
                      {deletingId === cat._id ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin mr-1" /> Deleting...
                        </>
                      ) : (
                        <>
                          <Trash2 className="w-4 h-4 mr-1" /> Delete
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
