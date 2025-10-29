"use client";

import { useState } from "react";
import { CircleUserRound, LogOut, LogIn, UserPlus, Clock, ChevronUp } from "lucide-react";
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
        className="hidden sm:flex items-center gap-2 justify-center text-gray-800 rounded py-2 px-4 transition group"
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
        <div className="absolute -right-10 w-44 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50">
          {isLoggedIn ? (
            <>
              <Link
                href={`/user-profile/${user?._id}`}
                className="flex items-center px-4 py-2 text-gray-700 text-sm hover:bg-gray-100"
              >
                <CircleUserRound className="w-4 h-4 mr-2" /> My Profile
              </Link>

              <Link
                href="/orders"
                className="flex items-center px-4 py-2 text-gray-700 text-sm hover:bg-gray-100"
              >
                <Clock className="w-4 h-4 mr-2" /> Orders
              </Link>

              <div className="border-t border-gray-100 my-1" />

              <button
                onClick={handleLogout}
                className="w-full text-left flex items-center px-4 py-2 text-gray-700 text-sm hover:bg-gray-100"
              >
                <LogOut className="w-4 h-4 mr-2" /> Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/register"
                className="flex items-center px-4 py-2 text-gray-700 text-sm hover:bg-gray-100"
              >
                <UserPlus className="w-4 h-4 mr-2" /> Sign Up
              </Link>

              <Link
                href="/login"
                className="flex items-center px-4 py-2 text-gray-700 text-sm hover:bg-gray-100"
              >
                <LogIn className="w-4 h-4 mr-2" /> Login
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default UserMenu;
