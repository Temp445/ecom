'use client';

import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useAuth } from '@/context/AuthProvider';
import { MapPin, Phone, Edit2, Trash2, Plus, Save } from 'lucide-react';

interface AddressType {
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

export default function AddressForm() {
  const { user } = useAuth();

  const [formData, setFormData] = useState<AddressType>({
    userId: '',
    Name: '',
    MobileNumber: '',
    PinCode: '',
    Address: '',
    City: '',
    LandMark: '',
    State: '',
    Country: '',
    AltPhoneNumber: '',
  });

  const [addresses, setAddresses] = useState<AddressType[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

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
    } catch (err: any) {
      toast.error('Failed to load addresses');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.Name || !formData.MobileNumber || !formData.PinCode || !formData.Address || !formData.City) {
      toast.error('Please fill all required fields');
      return;
    }

    if (!formData.userId) {
      toast.error('User not found. Please login first.');
      return;
    }

    setLoading(true);
    try {
      if (editingId) {
        const res = await axios.put(`/api/address/${editingId}`, formData);
        toast.success(res.data.message || 'Address updated');
        setEditingId(null);
      } else {
        const res = await axios.post('/api/address', formData);
        toast.success(res.data.message || 'Address added');
      }

      setFormData({
        userId: user?._id,
        Name: '',
        MobileNumber: '',
        PinCode: '',
        Address: '',
        City: '',
        LandMark: '',
        State: '',
        Country: '',
        AltPhoneNumber: '',
      });

      setShowForm(false);
      fetchAddresses(user?._id);
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (address: AddressType) => {
    setFormData({ ...address });
    setEditingId(address._id || null);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this address?')) return;
    try {
      const res = await axios.delete(`/api/address/${id}`);
      toast.success(res.data.message || 'Address deleted');
      fetchAddresses(user?._id);
    } catch {
      toast.error('Failed to delete address');
    }
  };

  const cancelEdit = () => {
    setFormData({
      userId: user?._id,
      Name: '',
      MobileNumber: '',
      PinCode: '',
      Address: '',
      City: '',
      LandMark: '',
      State: '',
      Country: '',
      AltPhoneNumber: '',
    });
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Delivery Addresses</h1>
          <p className="text-slate-600">Manage your saved delivery addresses</p>
        </div>

        {/* Add Address Button */}
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="mb-6 flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-all shadow-md hover:shadow-lg"
          >
            <Plus size={20} />
            Add New Address
          </button>
        )}

        {/* Address Form */}
        {showForm && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-slate-200">
            <h2 className="text-xl font-semibold mb-6 text-slate-900 flex items-center gap-2">
              <MapPin size={24} className="text-blue-600" />
              {editingId ? 'Edit Address' : 'Add New Address'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="Name"
                    placeholder="John Doe"
                    value={formData.Name}
                    onChange={handleChange}
                    className="w-full border border-slate-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="MobileNumber"
                    placeholder="+91 98765 43210"
                    value={formData.MobileNumber}
                    onChange={handleChange}
                    className="w-full border border-slate-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Pin Code <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="PinCode"
                    placeholder="600001"
                    value={formData.PinCode}
                    onChange={handleChange}
                    className="w-full border border-slate-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="City"
                    placeholder="Chennai"
                    value={formData.City}
                    onChange={handleChange}
                    className="w-full border border-slate-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    State
                  </label>
                  <input
                    name="State"
                    placeholder="Tamil Nadu"
                    value={formData.State}
                    onChange={handleChange}
                    className="w-full border border-slate-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Country
                  </label>
                  <input
                    name="Country"
                    placeholder="India"
                    value={formData.Country}
                    onChange={handleChange}
                    className="w-full border border-slate-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Full Address <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="Address"
                  placeholder="House No., Street Name, Area"
                  value={formData.Address}
                  onChange={handleChange}
                  className="w-full border border-slate-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  rows={3}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Landmark
                  </label>
                  <input
                    name="LandMark"
                    placeholder="Near City Mall"
                    value={formData.LandMark}
                    onChange={handleChange}
                    className="w-full border border-slate-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Alternate Phone
                  </label>
                  <input
                    name="AltPhoneNumber"
                    placeholder="+91 98765 43211"
                    value={formData.AltPhoneNumber}
                    onChange={handleChange}
                    className="w-full border border-slate-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:bg-slate-400 transition-all font-medium flex items-center justify-center gap-2 shadow-md"
                >
                  <Save size={20} />
                  {loading ? 'Saving...' : editingId ? 'Update Address' : 'Save Address'}
                </button>
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="px-6 py-3 border-2 border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-all font-medium"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Saved Addresses */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-slate-900">Saved Addresses</h3>

          {addresses.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-md p-12 text-center border border-slate-200">
              <MapPin size={48} className="mx-auto text-slate-300 mb-4" />
              <p className="text-slate-500 text-lg">No addresses found.</p>
              <p className="text-slate-400 text-sm mt-2">Add your first delivery address to get started</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {addresses.map((addr) => (
                <div
                  key={addr._id}
                  className="bg-white rounded-xl shadow-md p-5 border border-slate-200 hover:shadow-lg transition-all"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-start gap-3">
                      <div className="bg-blue-100 p-2 rounded-lg">
                        <MapPin size={20} className="text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg text-slate-900">{addr.Name}</h4>
                        <div className="flex items-center gap-2 text-sm text-slate-600 mt-1">
                          <Phone size={14} />
                          <span>{addr.MobileNumber}</span>
                          {addr.AltPhoneNumber && (
                            <>
                              <span className="text-slate-400">|</span>
                              <span>{addr.AltPhoneNumber}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(addr)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                        title="Edit"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(addr._id!)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>

                  <div className="ml-11 space-y-1 text-slate-600">
                    <p>{addr.Address}</p>
                    {addr.LandMark && <p className="text-sm text-slate-500">Landmark: {addr.LandMark}</p>}
                    <p className="text-sm">
                      {addr.City}, {addr.State && `${addr.State}, `}{addr.Country} - <span className="font-medium">{addr.PinCode}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}