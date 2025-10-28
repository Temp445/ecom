"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { Loader2, Save, Image as ImageIcon, ArrowLeft } from "lucide-react";

const CategoryEditPage = () => {
  const { id } = useParams();
  const router = useRouter();

  const [formData, setFormData] = useState({
    Name: "",
    CatImage: null as File | null,
  });
  const [preview, setPreview] = useState<string | null>(null);
  const [existingImage, setExistingImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Fetch existing category
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        setFetching(true);
        const res = await axios.get(`/api/category/${id}`);
        const category = res.data.data;
        setFormData({ Name: category.Name, CatImage: null });
        setExistingImage(category.CatImage);
      } catch (err: any) {
        setMessage({
          type: "error",
          text: err.response?.data?.message || "Failed to fetch category details.",
        });
      } finally {
        setFetching(false);
      }
    };
    fetchCategory();
  }, [id]);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "CatImage" && e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData({ ...formData, CatImage: file });
      setPreview(URL.createObjectURL(file));
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  // Submit update
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.Name) {
      setMessage({ type: "error", text: "Category name is required." });
      return;
    }

    try {
      setLoading(true);
      setMessage(null);

      const data = new FormData();
      data.append("Name", formData.Name);
      if (formData.CatImage) {
        data.append("CatImage", formData.CatImage);
      }

      const res = await axios.put(`/api/category/${id}`, data);
      setMessage({ type: "success", text: res.data.message || "Category updated successfully!" });

      // Refresh displayed data
      setFormData({ Name: formData.Name, CatImage: null });
      setPreview(null);
      if (res.data.data.CatImage) {
        setExistingImage(res.data.data.CatImage);
      }
    } catch (err: any) {
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Failed to update category.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        <Loader2 className="animate-spin mr-2" /> Loading category details...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-10">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">Edit Category</h1>
          <button
            onClick={() => router.back()}
            className="text-gray-500 hover:text-gray-700 flex items-center text-sm"
          >
            <ArrowLeft className="w-4 h-4 mr-1" /> Back
          </button>
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

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Category Name */}
          <div>
            <label className="block font-medium mb-1">Category Name</label>
            <input
              type="text"
              name="Name"
              value={formData.Name}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 focus:ring focus:ring-blue-200 outline-none"
              placeholder="Enter category name"
            />
          </div>

          {/* Current Image */}
          {existingImage && !preview && (
            <div>
              <p className="text-sm text-gray-600 mb-2">Current Image:</p>
              <img
                src={existingImage}
                alt="Existing Category"
                className="w-24 h-24 rounded-lg object-cover border"
              />
            </div>
          )}

          {/* Upload New Image */}
          <div>
            <label className="block font-medium mb-1">Change Image</label>
            <div className="flex items-center gap-3">
              <label className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition">
                <input
                  type="file"
                  name="CatImage"
                  accept="image/*"
                  className="hidden"
                  onChange={handleChange}
                />
                <ImageIcon className="w-8 h-8 text-gray-500 mb-1" />
                <span className="text-sm text-gray-600">
                  {formData.CatImage ? formData.CatImage.name : "Upload new image"}
                </span>
              </label>

              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-16 h-16 object-cover rounded-lg border"
                />
              )}
            </div>
          </div>

          {/* Save Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg flex items-center justify-center hover:bg-blue-700 transition disabled:opacity-70"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin mr-2 w-5 h-5" /> Updating...
              </>
            ) : (
              <>
                <Save className="mr-2 w-5 h-5" /> Save Changes
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CategoryEditPage;
