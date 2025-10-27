"use client";

import { useEffect, useState } from "react";
import { CircleUserRound, LogOut, LogIn, UserPlus, User, Clock } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [firstName, setFirstName] = useState<string | null>(null);
  const router = useRouter();

useEffect(() => {
  const loadUser = () => {
    const token = localStorage.getItem("token");
    const firstName = localStorage.getItem("firstName");

    if (token) {
      setIsLoggedIn(true);
      setFirstName(firstName);
    } else {
      setIsLoggedIn(false);
      setFirstName(null);
    }
  };

  loadUser(); 

  window.addEventListener("userLogin", loadUser);
  window.addEventListener("userLogout", loadUser);

  return () => {
    window.removeEventListener("userLogin", loadUser);
    window.removeEventListener("userLogout", loadUser);
  };
}, []);


  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("firstName");
    setIsLoggedIn(false);
    setFirstName(null);
    router.push("/login");
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="hidden sm:flex items-center justify-center text-gray-800 hover:bg-gray-200 rounded-full p-2 transition"
      >
          {isLoggedIn ? 
        <CircleUserRound className="w-7 h-7 text-emerald-600" /> :  <CircleUserRound className="w-7 h-7" />
          }
      </button>

      {isOpen && (
        <div className="absolute -right-10 w-40 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50">
          {isLoggedIn ? (
            <>
              <div className="px-4 py-2 border-b border-gray-300 text-sm font-semibold text-gray-800">
                Hello, {firstName?.split(" ")[0] || "User"}
              </div>

              <Link
                href="/profile"
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                <User className="w-4 h-4 mr-2" /> Profile
              </Link>

              <Link
                href="/orders"
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                <Clock className="w-4 h-4 mr-2" /> Order 
              </Link>

              <div className="border-t border-gray-100 my-1" />

              <button
                onClick={handleLogout}
                className="w-full text-left flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                <LogOut className="w-4 h-4 mr-2" /> Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/register"
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                <UserPlus className="w-4 h-4 mr-2" /> Sign Up
              </Link>

              <Link
                href="/login"
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
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
