"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Loader2, Upload, X, Image as ImageIcon, Plus } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const ProductUploadPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    model: "",
    brand: "",
    category: "",
    price: "",
    discountPrice: "",
    stock: "",
  });

  const [categories, setCategories] = useState<any[]>([]);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // ✅ Fetch categories for dropdown
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get("/api/category");
        setCategories(data.data || []);
      } catch {
        toast.error("Failed to load categories");
      }
    };
    fetchCategories();
  }, []);

  // ✅ Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle thumbnail upload
  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnail(file);
      setThumbnailPreview(URL.createObjectURL(file));
    }
  };

  // ✅ Handle gallery upload
  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newFiles = [...images, ...files];
    setImages(newFiles);
    setImagePreviews(newFiles.map((file) => URL.createObjectURL(file)));
  };

  const removeThumbnail = () => {
    setThumbnail(null);
    setThumbnailPreview(null);
  };

  const removeImage = (index: number) => {
    const newFiles = images.filter((_, i) => i !== index);
    setImages(newFiles);
    setImagePreviews(newFiles.map((f) => URL.createObjectURL(f)));
  };

  // ✅ Submit product
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.description || !formData.category || !formData.price || !formData.stock) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);

      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => data.append(key, value));
      if (thumbnail) data.append("thumbnail", thumbnail);
      images.forEach((file) => data.append("images", file));

      await axios.post("/api/product", data);

      toast.success("Product uploaded successfully");
      setFormData({
        name: "",
        description: "",
        model: "",
        brand: "",
        category: "",
        price: "",
        discountPrice: "",
        stock: "",
      });
      setThumbnail(null);
      setImages([]);
      setThumbnailPreview(null);
      setImagePreviews([]);
      router.push("/admin/product");

    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to upload product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white/50 py-12 px-4">
      <div className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-3xl border border-gray-100">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Upload Product</h1>
          <p className="text-gray-500 text-sm">Add a new product with images and details</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name and Brand */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Product Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-1 outline-none text-gray-800"
                placeholder="Enter product name"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Brand</label>
              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-1 outline-none text-gray-800"
                placeholder="Enter brand name"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-1 outline-none text-gray-800"
              rows={3}
              placeholder="Enter product description"
            />
          </div>

          {/* Category, Model */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Category *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-1 outline-none text-gray-800"
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.Name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Model</label>
              <input
                type="text"
                name="model"
                value={formData.model}
                onChange={handleChange}
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-1 outline-none text-gray-800"
                placeholder="Enter model name"
              />
            </div>
          </div>

          {/* Price, Discount, Stock */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Price *</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-1 outline-none text-gray-800"
                placeholder="0.00"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Discount Price</label>
              <input
                type="number"
                name="discountPrice"
                value={formData.discountPrice}
                onChange={handleChange}
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-1 outline-none text-gray-800"
                placeholder="0.00"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Stock *</label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-1 outline-none text-gray-800"
                placeholder="Available stock"
              />
            </div>
          </div>

          {/* Thumbnail Upload */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Thumbnail Image</label>
            {!thumbnailPreview ? (
              <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-8 cursor-pointer hover:border-gray-500 hover:bg-blue-50 transition-all group">
                <input type="file" name="thumbnail" accept="image/*" className="hidden" onChange={handleThumbnailChange} />
                <ImageIcon className="w-8 h-8 text-gray-400 mb-3 group-hover:text-gray-900" />
                <span className="text-sm font-medium text-gray-600">Click to upload thumbnail</span>
              </label>
            ) : (
              <div className="relative rounded-xl overflow-hidden border-2 border-gray-200 group">
                <img src={thumbnailPreview} alt="Thumbnail" className="w-full h-48 object-cover" />
                <button
                  type="button"
                  onClick={removeThumbnail}
                  className="absolute top-2 right-2 bg-white text-red-600 rounded-full p-2 hover:bg-red-50 shadow"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>

          {/* Gallery Upload */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Gallery Images</label>
            <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-6 cursor-pointer hover:border-gray-500 hover:bg-blue-50 transition-all group">
              <input multiple type="file" name="images" accept="image/*" className="hidden" onChange={handleImagesChange} />
              <Plus className="w-8 h-8 text-gray-400 mb-2 group-hover:text-gray-900" />
              <span className="text-sm text-gray-600">Add product images</span>
            </label>

            {imagePreviews.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                {imagePreviews.map((src, i) => (
                  <div key={i} className="relative rounded-lg overflow-hidden border">
                    <img src={src} alt="Preview" className="w-full h-28 object-cover" />
                    <button
                      type="button"
                      onClick={() => removeImage(i)}
                      className="absolute top-1 right-1 bg-white text-red-600 rounded-full p-1 shadow hover:bg-red-50"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-700 text-white py-3.5 rounded-xl flex items-center justify-center transition-all duration-200 font-semibold shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin mr-2 w-5 h-5" /> Uploading...
              </>
            ) : (
              <>
                <Upload className="mr-2 w-5 h-5" /> Upload Product
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductUploadPage;
