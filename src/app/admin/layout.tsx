import React from "react";
import ProductedRoute from "@/Components/Common/ProductedRoute";
import Sidebar from "@/Components/Common/Sidebar";

const Admin = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex">
      <div className="relative w-[17vw]">
      <Sidebar />
      </div>
      <div className="flex-1">
        <ProductedRoute>{children}</ProductedRoute>
      </div>
    </div>
  );
};

export default Admin;
