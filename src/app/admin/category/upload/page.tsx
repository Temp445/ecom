"use client";

import React, { useState } from "react";
import axios from "axios";
import { Loader2, Upload, Image as ImageIcon } from "lucide-react";

const CategoryUploadPage = () => {
  const [formData, setFormData] = useState({
    Name: "",
    CatImage: null as File | null,
  });
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "CatImage" && e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData({ ...formData, CatImage: file });
      setPreview(URL.createObjectURL(file));
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.Name || !formData.CatImage) {
      setMessage({ type: "error", text: "Please provide both name and image." });
      return;
    }

    try {
      setLoading(true);
      setMessage(null);
      const data = new FormData();
      data.append("Name", formData.Name);
      data.append("CatImage", formData.CatImage);

      const res = await axios.post("/api/category", data);
      setMessage({ type: "success", text: "Category uploaded successfully!" });
      setFormData({ Name: "", CatImage: null });
      setPreview(null);
    } catch (error: any) {
      setMessage({
        type: "error",
        text: error.response?.data?.message || "Failed to upload category.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-10">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-6 text-center">Upload Category</h1>

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

          {/* Image Upload */}
          <div>
            <label className="block font-medium mb-1">Category Image</label>
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
                  {formData.CatImage ? formData.CatImage.name : "Upload Image"}
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

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg flex items-center justify-center hover:bg-blue-700 transition disabled:opacity-70"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin mr-2 w-5 h-5" /> Uploading...
              </>
            ) : (
              <>
                <Upload className="mr-2 w-5 h-5" /> Upload Category
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CategoryUploadPage;
