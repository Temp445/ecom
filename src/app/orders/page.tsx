"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@/context/AuthProvider";
import { Clock, Loader2, ShoppingBag, MapPin, Star } from "lucide-react";
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
  const [reviewedProducts, setReviewedProducts] = useState<string[]>([]);
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

  const fetchReviewedProducts = async (userId: string, orders: Order[]) => {
    try {
      const reviewed: string[] = [];
      for (const order of orders) {
        for (const item of order.items) {
          try {
            const res = await axios.get(`/api/review?userId=${userId}&productId=${item.productId}`);
            if (res.data.data?.length > 0) reviewed.push(item.productId);
          } catch (err) {
            console.error(err);
          }
        }
      }
      setReviewedProducts(reviewed);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (user?._id) fetchOrders(user._id);
  }, [user]);

  useEffect(() => {
    if (user?._id && orders.length) fetchReviewedProducts(user._id, orders);
  }, [orders, user?._id]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Processing":
        return "text-orange-600";
      case "Shipped":
        return "text-blue-600";
      case "Delivered":
        return "text-green-600";
      case "Cancelled":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!orders.length) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 px-4">
        <ShoppingBag className="w-32 h-32 text-gray-300 mb-6" strokeWidth={1} />
        <h2 className="text-2xl font-medium text-gray-800 mb-2">No orders found</h2>
        <p className="text-gray-600 mb-8 text-center">
          Looks like you haven't placed any orders yet
        </p>
        <button
          onClick={() => router.push("/")}
          className="bg-blue-600 text-white px-8 py-3 font-medium hover:bg-blue-700 transition-colors shadow-md"
        >
          CONTINUE SHOPPING
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-3xl  font-medium text-gray-800">My Orders</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="bg-white rounded-2xl overflow-clip shadow-2xl">
              
              <div className="border-b bg-gray-950 text-gray-400 px-6 py-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-white">Order placed :</span>
                      <span className="text-sm font-medium">
                        {new Date(order.orderDate).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="hidden sm:block w-px h-4 bg-gray-300"></div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-white">Total : </span>
                      <span className="text-sm font-sans font-medium">₹{order.totalAmount.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="text-sm text-gray-400">
                    Order #{order._id}
                  </div>
                </div>
              </div>

              <div>
                {order.items.map((item, index) => {
                  const hasReviewed = reviewedProducts.includes(item.productId);
                  return (
                    <div key={item.productId} className={index > 0 ? "border-t" : ""}>
                      <div className="px-6 py-6">
                        <div className="flex flex-col lg:flex-row gap-6">
                          <div className="flex gap-4 flex-1">
                            <div className="flex-shrink-0">
                              <img
                                src={item.productImage}
                                alt={item.productName}
                                className="w-28 h-28 object-contain"
                              />
                            </div>
                            <div className="flex-1">
                              <h3 className="text-base font-normal text-gray-800 mb-2 line-clamp-2">
                                {item.productName}
                              </h3>
                              <div className="text-sm text-gray-600 mb-3">
                                Qty: {item.quantity}
                              </div>
                              <div className="text-base font-sans font-medium text-gray-800">
                                ₹{(item.priceAtPurchase * item.quantity ).toLocaleString()}
                              </div>
                            </div>
                          </div>

                          <div className="items-end flex flex-col justify-between">
                            <div>
                              <div className={`flex items-center gap-2 mb-2 font-medium ${getStatusColor(order.orderStatus)}`}>
                                <div className={`w-2 h-2 rounded-full ${
                                  order.orderStatus === "Delivered" ? "bg-green-600" :
                                  order.orderStatus === "Shipped" ? "bg-blue-600" :
                                  order.orderStatus === "Processing" ? "bg-orange-600" :
                                  "bg-red-600"
                                }`}></div>
                                <span className="text-sm">{order.orderStatus}</span>
                              </div>
                              {order.orderStatus === "Delivered" && (
                                <div className="text-sm text-gray-600 mb-4">
                                  Delivered on {new Date(order.orderDate).toLocaleDateString("en-IN", {
                                    day: "numeric",
                                    month: "short",
                                  })}
                                </div>
                              )}
                            </div>

                            {order.orderStatus === "Delivered" && (
                              <div className="flex flex-col gap-2">
                                <button
                                  onClick={() =>
                                    router.push(`/review/${item.productId}?orderId=${order._id}`)
                                  }
                                  className="w-full text-sm border border-gray-300 rounded-sm text-blue-600 px-4 py-2.5 font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                                >
                                  <Star className="w-4 h-4" />
                                  {hasReviewed ? "Edit Review" : "Add Your Review"}
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

            
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}