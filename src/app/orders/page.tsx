"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@/context/AuthProvider";
import { Package, Clock, Loader2, ShoppingBag } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type OrderItem = {
  priceAtPurchase: number;
  productId: string;
  productName: string;
  productImage: string;
  quantity: number;
  price: number;
};

type Order = {
  _id: string;
  userId: string;
  orderDate: string;
  totalAmount: number;
  orderStatus: string;
  items: OrderItem[];
};

export default function OrdersPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  const fetchOrders = async (userId: string) => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/orders?userId=${userId}`);
      setOrders(res.data.data || res.data.orders || []);
    } catch {
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?._id) fetchOrders(user._id);
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex justify-center items-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-emerald-600 mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Loading your orders...</p>
        </div>
      </div>
    );
  }

  if (!orders.length) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="bg-white rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6 shadow-lg">
            <ShoppingBag className="w-12 h-12 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">No orders yet</h2>
          <p className="text-gray-600 mb-6">
            Start shopping and your orders will appear here
          </p>
          <button className="bg-emerald-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-emerald-700 transition">
            Start Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
   
            My Orders
          </h1>
          <p className="text-gray-600">Track and manage your orders</p>
        </div>

        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-200 cursor-pointer"
              onClick={() => router.push(`/orders/${order._id}`)}
            >
              <div className="bg-gradient-to-r from-gray-50 to-white px-6 py-4 border-b border-gray-200">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="font-semibold text-gray-900">Order ID:</span>
                      <span className="font-mono">{order._id}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>
                        Delivery Date:{" "}
                        {new Date(order.orderDate).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-2xl font-medium font-sans text-gray-900">
                        ₹{order.totalAmount.toLocaleString()}
                      </p>
                      
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap ${
                        order.orderStatus === "Processing"
                          ? "bg-yellow-100 text-yellow-700 border border-yellow-200"
                          : order.orderStatus === "Shipped"
                          ? "bg-blue-100 text-blue-700 border border-blue-200"
                          : order.orderStatus === "Delivered"
                          ? "bg-green-100 text-green-700 border border-green-200"
                          : order.orderStatus === "Cancelled"
                          ? "bg-red-100 text-red-700 border border-red-200"
                          : ""
                      }`}
                    >
                      {order.orderStatus}
                    </span>
                  </div>
                </div>
              </div>

              <div className="px-6 py-5">
                <div className="space-y-4">
                  {order.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition"
                    >
                      <div className="flex-shrink-0">
                        <img
                          src={item.productImage}
                          alt={item.productName}
                          className="w-20 h-20 rounded-lg object-contain border-2 border-gray-200 shadow-sm"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 text-lg mb-1 truncate">
                          {item.productName}
                        </h3>
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                          <span className="bg-gray-100 px-2 py-1 rounded">
                            Qty: {item.quantity}
                          </span>
                          <span className="font-sans">₹{item.priceAtPurchase.toLocaleString()} each</span>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                    
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}