"use client";

import { useEffect, useState } from "react";
import {
  CircleUserRound,
  LogOut,
  LogIn,
  UserPlus,
  Clock,
  ChevronUp,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // ✅ Load user from localStorage on mount
  useEffect(() => {
    const loadUser = () => {
      const token = localStorage.getItem("token");
      const storedUserId = localStorage.getItem("userId");

      if (token && storedUserId) {
        setIsLoggedIn(true);
        setUserId(storedUserId);
      } else {
        setIsLoggedIn(false);
        setUserId(null);
        setUser(null);
      }
    };

    loadUser();

    // Listen for login/logout events across app
    window.addEventListener("userLogin", loadUser);
    window.addEventListener("userLogout", loadUser);

    return () => {
      window.removeEventListener("userLogin", loadUser);
      window.removeEventListener("userLogout", loadUser);
    };
  }, []);

  // ✅ Fetch user data from API
  useEffect(() => {
    const fetchUser = async () => {
      if (!userId) return;

      try {
        const res = await fetch(`/api/auth/users/${userId}`);
        const data = await res.json();

        if (data.success && data.data) {
          setUser(data.data);
          setError(null);
        } else {
          setError("User not found");
          setUser(null);
        }
      } catch (err) {
        console.error("Error fetching user:", err);
        setError("Failed to load user profile.");
      }
    };

    fetchUser();
  }, [userId]);

  // ✅ Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setIsLoggedIn(false);
    setUserId(null);
    setUser(null);
    window.dispatchEvent(new Event("userLogout"));
    router.push("/login");
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Profile button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="hidden sm:flex items-center gap-2 justify-center text-gray-800 rounded py-2 px-4 transition group"
      >
        {isLoggedIn ? (
          <div className="flex gap-2 items-center">
            <CircleUserRound className="w-6 h-6" />
            <span>{user?.firstName || "User"}</span>
            <span
              className={`transition-transform duration-300 ${
                isOpen ? "rotate-180" : "group-hover:rotate-180"
              }`}
            >
              <ChevronUp className="w-4 h-5" />
            </span>
          </div>
        ) : (
          <Link href="/login" className="flex gap-2 items-center">
            <CircleUserRound className="w-6 h-6" /> Login
            <ChevronUp className="w-4 h-5 group-hover:rotate-180 transition-transform duration-300" />
          </Link>
        )}
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute -right-10 w-44 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50">
          {isLoggedIn ? (
            <>
              <Link
                href={`/user-profile/${userId}`}
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
