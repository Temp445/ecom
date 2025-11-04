"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

export default function OrderDetailPage() {
  const { orderId } = useParams();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orderId) return;
    const fetchOrder = async () => {
      try {
        const { data } = await axios.get(`/api/orders/${orderId}`);
        setOrder(data);
      } catch (error) {
        console.error("Error fetching order:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [orderId]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-[70vh] text-gray-500">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-600"></div>
      </div>
    );

  if (!order)
    return (
      <div className="text-center text-gray-500 mt-10">Order not found.</div>
    );

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      {/* ===== ORDER HEADER ===== */}
      <div className="border rounded-xl p-5 shadow-sm">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold">Order #{order._id}</h2>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              order.orderStatus === "Delivered"
                ? "bg-green-100 text-green-700"
                : order.orderStatus === "Cancelled"
                ? "bg-red-100 text-red-600"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {order.orderStatus}
          </span>
        </div>

        <div className="text-sm text-gray-600 space-y-1">
          <p>
            <strong>Order Date:</strong>{" "}
            {new Date(order.orderDate).toLocaleString()}
          </p>
          {order.deliveryDate && (
            <p>
              <strong>Expected Delivery:</strong>{" "}
              {new Date(order.deliveryDate).toLocaleDateString()}
            </p>
          )}
          <p>
            <strong>Payment:</strong> {order.paymentMethod} (
            {order.paymentStatus})
          </p>
          {order.transactionId && (
            <p>
              <strong>Transaction ID:</strong> {order.transactionId}
            </p>
          )}
        </div>
      </div>

      {/* ===== ORDER ITEMS ===== */}
      <div className="border rounded-xl p-5 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Ordered Items</h3>
        <div className="space-y-4">
          {order.items.map((item: any, idx: number) => (
            <div
              key={idx}
              className="flex justify-between items-center border-b pb-3 last:border-b-0"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden">
                  {item.productImage ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.productImage}
                      alt={item.productName}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <span className="text-xs text-gray-500">No Image</span>
                  )}
                </div>
                <div>
                  <p className="font-medium text-gray-800">
                    {item.productName}
                  </p>
                  <p className="text-sm text-gray-500">
                    Qty: {item.quantity} × ₹{item.priceAtPurchase}
                  </p>
                </div>
              </div>
              <div className="text-right font-semibold text-gray-700">
                ₹{item.priceAtPurchase * item.quantity}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between mt-4 text-lg font-semibold">
          <span>Total:</span>
          <span>₹{order.totalAmount}</span>
        </div>
      </div>

      {/* ===== SHIPPING ADDRESS ===== */}
      {order.shippingAddress && (
        <div className="border rounded-xl p-5 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Shipping Address</h3>
          <div className="text-sm text-gray-700 space-y-1">
            <p className="font-medium">{order.shippingAddress.name}</p>
            <p>{order.shippingAddress.address}</p>
            {order.shippingAddress.landMark && (
              <p>Landmark: {order.shippingAddress.landMark}</p>
            )}
            <p>
              {order.shippingAddress.city}, {order.shippingAddress.state} -{" "}
              {order.shippingAddress.pinCode}
            </p>
            <p>{order.shippingAddress.country}</p>
            <p> {order.shippingAddress.mobileNumber}</p>
          </div>
        </div>
      )}

 
    </div>
  );
}
