"use client";

import React, { useEffect, useState } from "react";
import { MapPin, Plus, Save, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuth } from "@/context/AuthProvider";

export interface AddressType {
  _id?: string;
  userId: string;
  Name: string;
  MobileNumber: string;
  PinCode: string;
  Address: string;
  City: string;
  LandMark?: string;
  State?: string;
  Country?: string;
  AltPhoneNumber?: string;
}

export default function CheckoutAddress({
  selectedAddressId,
  onSelect,
}: {
  selectedAddressId: string;
  onSelect: (id: string) => void;
}) {
  const { user } = useAuth();

  const [addresses, setAddresses] = useState<AddressType[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<AddressType>({
    userId: "",
    Name: "",
    MobileNumber: "",
    PinCode: "",
    Address: "",
    City: "",
    LandMark: "",
    State: "",
    Country: "",
    AltPhoneNumber: "",
  });

  // Fetch addresses when user loads
  useEffect(() => {
    if (user?._id) {
      setFormData((prev) => ({ ...prev, userId: user._id }));
      fetchAddresses(user._id);
    }
  }, [user]);

  const fetchAddresses = async (userId: string) => {
    try {
      const res = await axios.get(`/api/address?userId=${userId}`);
      setAddresses(res.data.data || []);
    } catch {
      toast.error("Failed to load addresses");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.Name || !formData.MobileNumber || !formData.PinCode || !formData.Address || !formData.City) {
      toast.error("Please fill all required fields");
      return;
    }

    if (!formData.userId) {
      toast.error("Please log in first");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("/api/address", formData);
      toast.success(res.data.message || "Address added successfully");
      setShowForm(false);
      setFormData({
        userId: user?._id ?? "",
        Name: "",
        MobileNumber: "",
        PinCode: "",
        Address: "",
        City: "",
        LandMark: "",
        State: "",
        Country: "",
        AltPhoneNumber: "",
      });
      fetchAddresses(user?._id ?? "");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to save address");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-white rounded-xl shadow-md p-6 border border-slate-200">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-slate-900">
        <MapPin className="text-emerald-600" /> Delivery Address
      </h2>

      {/* Saved Addresses */}
      {addresses.length ? (
        <div className="grid gap-3 mb-6">
          {addresses.map((addr) => (
            <label
              key={addr._id}
              className={`flex flex-col sm:flex-row justify-between border p-4 rounded-lg cursor-pointer transition ${
                selectedAddressId === addr._id
                  ? "border-emerald-600 bg-emerald-50"
                  : "border-slate-300 hover:border-emerald-300"
              }`}
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <input
                    type="radio"
                    name="address"
                    value={addr._id}
                    checked={selectedAddressId === addr._id}
                    onChange={(e) => onSelect(e.target.value)}
                    className="accent-emerald-600"
                  />
                  <span className="font-semibold text-slate-900">{addr.Name}</span>
                </div>
                <p className="text-sm text-slate-600 ml-6">
                  {addr.Address}, {addr.City}, {addr.State} {addr.PinCode}, {addr.Country}
                </p>
                <p className="text-sm text-slate-500 ml-6 mt-1">
                  📞 {addr.MobileNumber}
                  {addr.AltPhoneNumber && ` | ${addr.AltPhoneNumber}`}
                </p>
              </div>
            </label>
          ))}
        </div>
      ) : (
        <div className="text-slate-500 mb-4">No addresses found.</div>
      )}

      {/* Add New Address Form */}
      {!showForm ? (
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 border border-emerald-600 text-emerald-700 px-4 py-2 rounded-lg hover:bg-emerald-50 transition"
        >
          <Plus size={18} /> Add New Address
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 mt-6 border-t pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="Name"
              placeholder="Full Name"
              value={formData.Name}
              onChange={handleChange}
              required
              className="border border-slate-300 p-2 rounded-lg"
            />
            <input
              name="MobileNumber"
              placeholder="Mobile Number"
              value={formData.MobileNumber}
              onChange={handleChange}
              required
              className="border border-slate-300 p-2 rounded-lg"
            />
            <input
              name="PinCode"
              placeholder="Pin Code"
              value={formData.PinCode}
              onChange={handleChange}
              required
              className="border border-slate-300 p-2 rounded-lg"
            />
            <input
              name="City"
              placeholder="City"
              value={formData.City}
              onChange={handleChange}
              required
              className="border border-slate-300 p-2 rounded-lg"
            />
            <input
              name="State"
              placeholder="State"
              value={formData.State}
              onChange={handleChange}
              className="border border-slate-300 p-2 rounded-lg"
            />
            <input
              name="Country"
              placeholder="Country"
              value={formData.Country}
              onChange={handleChange}
              className="border border-slate-300 p-2 rounded-lg"
            />
          </div>

          <textarea
            name="Address"
            placeholder="Address Line"
            value={formData.Address}
            onChange={handleChange}
            required
            className="border border-slate-300 p-2 rounded-lg w-full"
            rows={3}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="LandMark"
              placeholder="Landmark (optional)"
              value={formData.LandMark}
              onChange={handleChange}
              className="border border-slate-300 p-2 rounded-lg"
            />
            <input
              name="AltPhoneNumber"
              placeholder="Alternate Phone"
              value={formData.AltPhoneNumber}
              onChange={handleChange}
              className="border border-slate-300 p-2 rounded-lg"
            />
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition"
            >
              {loading ? <Loader2 className="animate-spin mr-2" /> : <Save className="mr-2" />}{" "}
              {loading ? "Saving..." : "Save Address"}
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="border border-slate-300 px-4 py-2 rounded-lg hover:bg-slate-50 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </section>
  );
}
