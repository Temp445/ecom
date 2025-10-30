"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import {
  Loader2,
  Save,
  Image as ImageIcon,
  X,
  ArrowLeft,
  Plus,
} from "lucide-react";
import toast from "react-hot-toast";

const ProductEditPage = () => {
  const { pathUrl } = useParams();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    model: "",
    brand: "",
    price: "",
    discountPrice: "",
    stock: "",
    category: "",
  });

  const [categories, setCategories] = useState<any[]>([]);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  // ✅ Fetch product + categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productRes, categoryRes] = await Promise.all([
          axios.get(`/api/product/${pathUrl}`),
          axios.get("/api/category"),
        ]);

        const product = productRes.data.data;
        setCategories(categoryRes.data.data || []);

        setFormData({
          name: product.name || "",
          description: product.description || "",
          model: product.model || "",
          brand: product.brand || "",
          price: product.price || "",
          discountPrice: product.discountPrice || "",
          stock: product.stock || "",
          category: product.category || "",
        });

        setThumbnailPreview(product.thumbnail || null);
        setExistingImages(product.images || []);
      } catch (err) {
        toast.error("Failed to fetch product or categories");
      } finally {
        setFetching(false);
      }
    };

    fetchData();
  }, [pathUrl]);

  // ✅ Handle input change safely
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "number") {
      if (value === "") {
        setFormData({ ...formData, [name]: "" });
        return;
      }

      // Prevent negative numbers
      const numericValue = Math.max(0, Number(value));
      setFormData({ ...formData, [name]: numericValue });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // ✅ Thumbnail Upload
  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnail(file);
      setThumbnailPreview(URL.createObjectURL(file));
    }
  };

  const removeThumbnail = () => {
    setThumbnail(null);
    setThumbnailPreview(null);
  };

  // ✅ Gallery Image Upload
  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newFiles = [...images, ...files];
    setImages(newFiles);
    setImagePreviews(newFiles.map((file) => URL.createObjectURL(file)));
  };

  const removeImage = (index: number) => {
    const newFiles = images.filter((_, i) => i !== index);
    setImages(newFiles);
    setImagePreviews(newFiles.map((f) => URL.createObjectURL(f)));
  };

  const removeExistingImage = (url: string) => {
    setExistingImages(existingImages.filter((img) => img !== url));
  };

  // ✅ Handle Form Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.description || !formData.category || !formData.price || !formData.stock) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);

      const data = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        // Skip discountPrice if empty
        if (key === "discountPrice" && (value === "" || value === null)) return;
        data.append(key, value);
      });

      if (thumbnail) data.append("thumbnail", thumbnail);
      images.forEach((file) => data.append("images", file));
      data.append("existingImages", JSON.stringify(existingImages));

      await axios.put(`/api/product/${pathUrl}`, data);

      toast.success("Product updated successfully");
      router.push("/admin/product");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to update product");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin text-gray-500" size={36} />
      </div>
    );
  }

  // ✅ Render
  return (
    <div className="min-h-screen flex items-center justify-center bg-white/50 py-12 px-4">
      <div className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-3xl border border-gray-100">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Update Product</h1>
            <p className="text-gray-500 text-sm">Edit product details and images</p>
          </div>
          <button
            onClick={() => router.back()}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="mr-1 w-4 h-4" /> Back
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Product Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 outline-none text-gray-800"
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
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 outline-none text-gray-800"
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
              rows={3}
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 outline-none text-gray-800"
              placeholder="Enter product description"
            />
          </div>

          {/* Category + Model */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Category *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 outline-none text-gray-800"
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
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 outline-none text-gray-800"
                placeholder="Enter model name"
              />
            </div>
          </div>

          {/* Price + Discount + Stock */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Price *</label>
              <input
                type="number"
                name="price"
                min="0"
                value={formData.price}
                onChange={handleChange}
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 outline-none text-gray-800"
                placeholder="1000"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Discount Price</label>
              <input
                type="number"
                name="discountPrice"
                min="0"
                value={formData.discountPrice}
                onChange={handleChange}
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 outline-none text-gray-800"
                placeholder="500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Stock *</label>
              <input
                type="number"
                name="stock"
                min="0"
                value={formData.stock}
                onChange={handleChange}
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 outline-none text-gray-800"
                placeholder="Available stock"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Thumbnail Image</label>
            {!thumbnailPreview ? (
              <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-8 cursor-pointer hover:border-gray-500 hover:bg-blue-50 transition-all group">
                <input type="file" accept="image/*" className="hidden" onChange={handleThumbnailChange} />
                <ImageIcon className="w-8 h-8 text-gray-400 mb-3 group-hover:text-gray-900" />
                <span className="text-sm text-gray-600">Click to upload thumbnail</span>
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

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Gallery Images</label>
            <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-6 cursor-pointer hover:border-gray-500 hover:bg-blue-50 transition-all group">
              <input multiple type="file" accept="image/*" className="hidden" onChange={handleImagesChange} />
              <Plus className="w-8 h-8 text-gray-400 mb-2 group-hover:text-gray-900" />
              <span className="text-sm text-gray-600">Add more images</span>
            </label>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              {existingImages.map((src, i) => (
                <div key={i} className="relative rounded-lg overflow-hidden border">
                  <img src={src} alt="Existing" className="w-full h-28 object-cover" />
                  <button
                    type="button"
                    onClick={() => removeExistingImage(src)}
                    className="absolute top-1 right-1 bg-white text-red-600 rounded-full p-1 shadow hover:bg-red-50"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
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
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-700 text-white py-3.5 rounded-xl flex items-center justify-center transition-all font-semibold shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
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

export default ProductEditPage;
