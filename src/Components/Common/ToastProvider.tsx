"use client";

import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      toastOptions={{
        duration: 4000,
        style: {
          background: "#000000",
          color: "#fff",
          borderRadius: "8px",
          fontSize: "14px",
        },
        success: {
          iconTheme: {
            primary: "#10B981", // green-500
            secondary: "#fff",
          },
           style: {
          background: "#fffff",
          color: "#00000",
          borderRadius: "8px",
          fontSize: "14px",
        }
        },
        error: {
          iconTheme: {
            primary: "#EF4444", // red-500
            secondary: "#fff",
          },
        },
      }}
    />
  );
}
