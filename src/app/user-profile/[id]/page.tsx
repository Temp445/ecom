"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import { Save, User, Loader2, Edit3, XCircle, Mail, Phone, UserCircle } from "lucide-react";
import { useAuth } from "@/context/AuthProvider";

const ProfilePage = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [originalUser, setOriginalUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const { setUser } = useAuth();

  useEffect(() => {
    if (!id) return;

    const fetchUser = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/api/auth/users/${id}`);
        if (res.data?.success && res.data?.data) {
          setProfile(res.data.data);
          setOriginalUser(res.data.data);
        } else {
          setError("User data not found.");
        }
      } catch (err) {
        console.error("Error fetching user:", err);
        setError("Failed to load user profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const res = await axios.put(`/api/auth/users/${id}`, profile);
      if (res.data?.success && res.data?.data) {
        setProfile(res.data.data);
        setOriginalUser(res.data.data);
        setUser(res.data.data);
        alert("Profile updated successfully!");
        setIsEditing(false);
      } else {
        alert(res.data?.message || "Update failed.");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setProfile(originalUser);
    setIsEditing(false);
  };

  const getInitials = () => {
    return `${profile.firstName.charAt(0)}${profile.lastName.charAt(0)}`.toUpperCase();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-red-200">
          <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-red-600 font-semibold text-center">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-xl rounded-3xl overflow-hidden mb-6 border border-gray-100">
          <div className="h-32 bg-blue-500 relative">
            <div className="absolute -bottom-14 left-8">
              <div className="w-32 h-32 rounded-full bg-white shadow-lg flex items-center justify-center border-4 border-white">
                <div className="w-28 h-28 rounded-full bg-blue-500 flex items-center justify-center">
                  <span className="text-white text-3xl font-bold">{getInitials()}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="pt-20 pb-8 px-8">
            <div className="flex items-end justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-1">
                  {profile.firstName} {profile.lastName}
                </h1>
                <p className="text-gray-500 flex items-center gap-2">
                  <Mail size={16} />
                  {profile.email}
                </p>
              </div>
              
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-xl  transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  <Edit3 size={18} /> Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white shadow-xl rounded-3xl p-8 border border-gray-100">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Personal Information</h2>
            <p className="text-gray-500 text-sm">
              {isEditing ? "Update your personal details below" : "View your account information"}
            </p>
          </div>

          <div className="space-y-6">
            <div className="group">
              <label className="block text-gray-700 font-medium mb-2 md:flex items-center gap-2">
                <UserCircle size={18} className="text-gray-400" />
                First Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="firstName"
                  value={profile.firstName}
                  onChange={handleChange}
                  readOnly={!isEditing}
                  className={`w-full border-2 rounded-xl px-4 py-3 transition-all ${
                    !isEditing
                      ? "bg-gray-50 border-gray-200 cursor-not-allowed text-gray-700"
                      : "bg-white border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                  }`}
                />
                {isEditing && (
                  <Edit3 size={18} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                )}
              </div>
            </div>

            <div className="group">
              <label className="block text-gray-700 font-medium mb-2 md:flex items-center gap-2">
                <UserCircle size={18} className="text-gray-400" />
                Last Name
              </label>
             <div className="relative">
               <input
                type="text"
                name="lastName"
                value={profile.lastName}
                onChange={handleChange}
                readOnly={!isEditing}
                className={`w-full border-2 rounded-xl px-4 py-3 transition-all ${
                  !isEditing
                    ? "bg-gray-50 border-gray-200 cursor-not-allowed text-gray-700"
                    : "bg-white border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                }`}
              />
                 {isEditing && (
                  <Edit3 size={18} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                )}
             </div>
            </div>

            <div className="group">
              <label className="block text-gray-700 font-medium mb-2 md:flex items-center gap-2">
                <Mail size={18} className="text-gray-400" />
                Email Address
              </label>
           <div className="relative">
               <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                readOnly={!isEditing}
                className={`w-full border-2 rounded-xl px-4 py-3 transition-all ${
                  !isEditing
                    ? "bg-gray-50 border-gray-200 cursor-not-allowed text-gray-700"
                    : "bg-white border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                }`}
              />
              {isEditing && (
                  <Edit3 size={18} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                )}
           </div>
            </div>

            <div className="group">
              <label className="block text-gray-700 font-medium mb-2 md:flex items-center gap-2">
                <Phone size={18} className="text-gray-400" />
                Phone Number
              </label>
              <div className="relative">
                <input
                type="tel"
                name="phone"
                readOnly={!isEditing}
                value={profile.phone}
                onChange={handleChange}
                className={`w-full border-2 rounded-xl px-4 py-3 transition-all ${
                  !isEditing
                    ? "bg-gray-50 border-gray-200 cursor-not-allowed text-gray-700"
                    : "bg-white border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                }`}
              />
               {isEditing && (
                  <Edit3 size={18} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                )}
              </div>
            </div>
          </div>

          {isEditing && (
            <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={handleCancel}
                disabled={saving}
                className="flex items-center gap-2 bg-gray-100 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-200 disabled:opacity-60 transition-all font-medium"
              >
                <XCircle size={18} /> Cancel
              </button>

              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-xl  disabled:opacity-60 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-medium"
              >
                {saving ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" /> Saving...
                  </>
                ) : (
                  <>
                    <Save size={18} /> Save Changes
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;