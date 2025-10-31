"use client";

import { useState } from "react";
import { CircleUserRound, LogOut, LogIn, UserPlus, MapPin, Package, ChevronUp, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthProvider";

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const isLoggedIn = !!user;

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2  justify-center text-gray-800  rounded py-4 px-4 transition group"
      >
        {isLoggedIn ? (
          <div className="flex gap-2 items-center">
            <CircleUserRound className="w-6 h-6" />
            <span>{user?.firstName || "User"}</span>
            <ChevronUp
              className={`w-4 h-5 transition-transform duration-300 ${
                isOpen ? "rotate-180" : "group-hover:rotate-180"
              }`}
            />
          </div>
        ) : (
          <Link href="/login" className="flex gap-2 items-center">
            <CircleUserRound className="w-6 h-6" /> Login
            <ChevronUp className="w-4 h-5 group-hover:rotate-180 transition-transform duration-300" />
          </Link>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 w-56 bg-white border border-gray-200 rounded-2xl shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          {isLoggedIn ? (
            <>
              <div className="px-4 py-3 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-md">
                    {user?.firstName?.charAt(0) || "U"}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{user?.firstName || "User"}</p>
                    <p className="text-xs text-gray-500">Manage your account</p>
                  </div>
                </div>
              </div>

              <div className="py-1">
                <a
                  href={`/user-profile`}
                  className="flex items-center px-4 py-2.5 text-gray-700 text-sm hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-200 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center mr-3 group-hover:bg-blue-200 transition-colors">
                    <User className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="font-medium">My Profile</span>
                </a>

                <a
                  href="/addresses"
                  className="flex items-center px-4 py-2.5 text-gray-700 text-sm hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 transition-all duration-200 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center mr-3 group-hover:bg-green-200 transition-colors">
                    <MapPin className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="font-medium">Addresses</span>
                </a>

                <a
                  href="/orders"
                  className="flex items-center px-4 py-2.5 text-gray-700 text-sm hover:bg-gradient-to-r hover:from-orange-50 hover:to-amber-50 transition-all duration-200 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center mr-3 group-hover:bg-orange-200 transition-colors">
                    <Package className="w-4 h-4 text-orange-600" />
                  </div>
                  <span className="font-medium">My Orders</span>
                </a>
              </div>

              <div className="border-t border-gray-100 my-1" />

              <button
                onClick={handleLogout}
                className="w-full text-left flex items-center px-4 py-2.5 text-red-600 text-sm hover:bg-red-50 transition-all duration-200 group"
              >
                <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center mr-3 group-hover:bg-red-200 transition-colors">
                  <LogOut className="w-4 h-4 text-red-600" />
                </div>
                <span className="font-medium">Logout</span>
              </button>
            </>
          ) : (
            <div className="py-1">
              <a
                href="/register"
                className="flex items-center px-4 py-2.5 text-gray-700 text-sm hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 transition-all duration-200 group"
              >
                <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center mr-3 group-hover:bg-purple-200 transition-colors">
                  <UserPlus className="w-4 h-4 text-purple-600" />
                </div>
                <span className="font-medium">Sign Up</span>
              </a>

              <a
                href="/login"
                className="flex items-center px-4 py-2.5 text-gray-700 text-sm hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200 group"
              >
                <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center mr-3 group-hover:bg-blue-200 transition-colors">
                  <LogIn className="w-4 h-4 text-blue-600" />
                </div>
                <span className="font-medium">Login</span>
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserMenu;
