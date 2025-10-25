'use client';

import { useState } from "react";

interface LoginProps {}

export default function LoginPage(props: LoginProps) {
  const [method, setMethod] = useState<"password" | "otp">("password");
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Send OTP
  const handleSendOtp = async () => {
    if (!emailOrPhone) return setMessage("Enter email or phone");
    setLoading(true);
    const res = await fetch("/api/auth/send-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ emailOrPhone }),
    });
    const data = await res.json();
    setMessage(data.message);
    if (res.ok) setOtpSent(true);
    setLoading(false);
  };

  // Submit Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    let url = "";
    let body: any = { emailOrPhone };

    if (method === "password") {
      url = "/api/auth/login/password";
      body.password = password;
    } else {
      url = "/api/auth/login/otp";
      body.otp = otp;
    }

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    setMessage(data.message || "Login successful!");
    if (res.ok) {
      localStorage.setItem("token", data.token); // save JWT
      // Redirect or reload page
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>

        {/* Method Toggle */}
        <div className="flex justify-center gap-4 mb-4">
          <button
            className={`px-4 py-2 rounded ${method === "password" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            onClick={() => setMethod("password")}
          >
            Password
          </button>
          <button
            className={`px-4 py-2 rounded ${method === "otp" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            onClick={() => setMethod("otp")}
          >
            OTP
          </button>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Email or Phone"
            value={emailOrPhone}
            onChange={(e) => setEmailOrPhone(e.target.value)}
            className="border p-2 rounded"
            required
          />

          {method === "password" && (
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border p-2 rounded"
              required
            />
          )}

          {method === "otp" && (
            <>
              {otpSent ? (
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="border p-2 rounded"
                  required
                />
              ) : (
                <button
                  type="button"
                  onClick={handleSendOtp}
                  className="bg-green-500 text-white p-2 rounded"
                  disabled={loading}
                >
                  {loading ? "Sending OTP..." : "Send OTP"}
                </button>
              )}
            </>
          )}

          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded mt-2 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Processing..." : method === "password" ? "Login" : "Verify OTP"}
          </button>

          <div className="text-right mt-2">
            <a href="/forgot-password" className="text-blue-500 hover:underline text-sm">
              Forgot Password?
            </a>
          </div>
        </form>

        {message && <p className="mt-4 text-center text-red-600">{message}</p>}
      </div>
    </div>
  );
}

