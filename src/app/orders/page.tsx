"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@/context/AuthProvider";
import { Package, Clock, CreditCard, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

type OrderItem = {
  productId: string;
  name: string;
  image: string;
  quantity: number;
  price: number;
};

type Order = {
  _id: string;
  userId: string;
  orderDate: string;
  totalAmount: number;
  paymentMethod: string;
  status: string;
  items: OrderItem[];
};

export default function OrdersPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async (userId: string) => {
      if (!user?._id) return;
      try {
        const res = await axios.get(`/api/orders?userId=${userId}`);
        setOrders(res.data.orders || []);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load your orders");
      } finally {
        setLoading(false);
      }
    };
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-600">
        <Loader2 className="animate-spin mr-2" /> Loading your orders...
      </div>
    );
  }

  if (!orders.length) {
    return (
      <div className="text-center py-20 text-gray-600">
        <Package className="mx-auto mb-4 text-gray-400" size={48} />
        <p className="text-lg font-medium">No orders found</p>
        <p className="text-sm text-gray-500">Once you make a purchase, it will appear here.</p>
      </div>
    );
  }

  return (
    <section className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold mb-6 flex items-center gap-2">
        <Package className="text-emerald-600" /> My Orders
      </h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="border rounded-2xl shadow-sm hover:shadow-md transition p-5"
          >
            <div className="flex flex-col md:flex-row justify-between gap-4 mb-3">
              <div>
                <p className="text-gray-700">
                  <span className="font-medium">Order ID:</span> {order._id}
                </p>
                <p className="text-gray-600 flex items-center gap-1">
                  <Clock size={16} /> {new Date(order.orderDate).toLocaleString()}
                </p>
              </div>

              <div className="text-right">
                <p className="font-medium text-lg">
                  ₹{order.totalAmount.toLocaleString()}
                </p>
                <p className="text-sm text-gray-500 flex items-center justify-end gap-1">
                  <CreditCard size={14} /> {order.paymentMethod}
                </p>
                <p
                  className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-semibold ${
                    order.status === "Delivered"
                      ? "bg-green-100 text-green-700"
                      : order.status === "Cancelled"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {order.status}
                </p>
              </div>
            </div>

            <div className="border-t pt-3 mt-3 space-y-3">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-lg object-cover border"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity} × ₹{item.price}
                    </p>
                  </div>
                  <p className="font-semibold text-gray-700">
                    ₹{(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
