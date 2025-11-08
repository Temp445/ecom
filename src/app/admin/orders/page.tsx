"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Package, CreditCard, Truck, Search , ClockFading } from "lucide-react";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/orders/admin");
      setOrders(data);
    } catch (error) {
      toast.error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    if (!newStatus) return;
    setUpdatingId(orderId);

    try {
      await axios.patch(`/api/orders/${orderId}`, { orderStatus: newStatus });
      toast.success("Order status updated");
      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, orderStatus: newStatus } : order
        )
      );
    } catch (error) {
      toast.error("Failed to update order status");
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredOrders = orders.filter(
    (order) =>
      order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.shippingAddressshippingAddress?.mobileNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    total: orders.length,
    processing: orders.filter((o) => o.orderStatus === "Processing").length,
    shipped: orders.filter((o) => o.orderStatus === "Shipped").length,
    delivered: orders.filter((o) => o.orderStatus === "Delivered").length,
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 border-4 border-gray-900 border-t-transparent rounded-full mx-auto mb-4"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Orders</h1>
              <p className="text-gray-500 mt-1">Track and manage all customer orders</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className=" rounded p-4 border ">
              <div className="flex items-center justify-between">
                <div>
                  <p className=" text-sm font-medium">Total Orders</p>
                  <p className="text-2xl font-bold mt-1">{stats.total}</p>
                </div>
                <Package className="w-10 h-10" />
              </div>
            </div>
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded p-4 border border-yellow-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-600 text-sm font-medium">Processing</p>
                  <p className="text-2xl font-bold text-yellow-900 mt-1">{stats.processing}</p>
                </div>
                <ClockFading className="w-10 h-10 text-yellow-600 opacity-80" />
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded p-4 border border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-600 text-sm font-medium">Shipped</p>
                  <p className="text-2xl font-bold text-blue-900 mt-1">{stats.shipped}</p>
                </div>
                <Truck className="w-10 h-10 text-blue-600 opacity-80" />
              </div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded p-4 border border-green-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-600 text-sm font-medium">Delivered</p>
                  <p className="text-2xl font-bold text-green-900 mt-1">{stats.delivered}</p>
                </div>
                <Package className="w-10 h-10 text-green-600 opacity-80" />
              </div>
            </div>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by order ID, customer name, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:border-gray-500 outline-none"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-6">
        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No orders found</h3>
            <p className="text-gray-500">Try adjusting your search criteria</p>
          </div>
        ) : (
          <div className="bg-white  shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full bg-white">
                <thead className=" border border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Order Details
                    </th>
                    <th className="px-2 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-8 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Items
                    </th>
                    <th className="px-2 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-4 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Payment
                    </th>
                    <th className="px-4 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-x divide-gray-200">
                  {filteredOrders.map((order) => (
                    <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-4">
                        <div>
                          <div className="font-mono text-sm font-semibold text-gray-900">
                            {order._id}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            {new Date(order.createdAt).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </div>
                        </div>
                      </td>

                      <td className="py-4">
                        <div className="flex items-center gap-3">
               
                          <div>
                            <div className="font-medium text-gray-900">{order.shippingAddress?.name}</div>
                            <div className="text-sm text-gray-500">{order.shippingAddress?.mobileNumber}</div>
                          </div>
                        </div>
                      </td>

                      <td className="px-2 py-4">
                        <div className="flex flex-col gap-2">
                          {order.items.map((item: any, i: number) => (
                            <div key={i} className="flex items-center gap-2 w-52">
                              <img
                                src={item.productImage}
                                alt={item.productName}
                                className="w-10 h-10 rounded object-contain"
                              />
                              <div className="flex-1 min-w-0 2xl:min-w-52">
                                <div className="text-sm font-medium text-gray-900 truncate">
                                  {item.productName}
                                </div>
                                <div className="text-xs text-gray-500">Qty: {item.quantity}</div>
                              </div>
                            </div>
                          ))}
                       
                        </div>
                      </td>

                      <td className="px-2 py-4 font-bold text-gray-900">
                        ₹{order.totalAmount?.toLocaleString()}
                      </td>

                      <td className="px-4 py-4">
                        <div className="flex flex-col gap-1">
                          <span className="text-sm font-medium text-gray-900 capitalize flex items-center gap-1">
                            <CreditCard className="w-4 h-4" />
                            {order.paymentMethod}
                          </span>
                          <span
                            className={`inline-flex w-fit items-center px-2.5 py-1 rounded text-xs font-medium ${
                              order.paymentStatus === "Paid"
                                ? "bg-green-100 text-green-800"
                                : order.paymentStatus === "Pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {order.paymentStatus}
                          </span>
                        </div>
                      </td>

                      <td className="px-2 py-4">
                        <span
                          className={`inline-flex items-center px-2 py-1.5 rounded text-xs 2xl:text-sm font-medium ${
                            order.orderStatus === "Delivered"
                              ? "bg-green-100 text-green-800 border border-green-200"
                              : order.orderStatus === "Shipped"
                              ? "bg-blue-100 text-blue-800 border border-blue-200"
                              : order.orderStatus === "Cancelled"
                              ? "bg-red-100 text-red-800 border border-red-200"
                              : "bg-yellow-100 text-yellow-800 border border-yellow-200"
                          }`}
                        >
                          {order.orderStatus}
                        </span>
                      </td>

                      <td className="px-2 py-4">
                        <div className="flex items-center gap-2">
                          <select
                            onChange={(e) => handleStatusChange(order._id, e.target.value)}
                            disabled={updatingId === order._id}
                            className="border border-gray-300 rounded px-3 py-2 text-xs 2xl:text-sm font-medium text-gray-700  focus:border-gray-800 outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                            value={order.orderStatus}
                          >
                            <option value="Processing">Processing</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>

                          {updatingId === order._id && (
                            <div className="animate-spin h-5 w-5 border-3 border-blue-600 border-t-transparent rounded-full"></div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
