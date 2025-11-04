import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Order from "@/models/Order";
import Address from "@/models/Address";

export async function GET() {
  try {
    await dbConnect();

    const orders = await Order.find()
      .populate("userId", "name email")
      .populate({
        path: "shippingAddress",
        model: Address,
        select:
          "Name MobileNumber PinCode Address City LandMark State Country",
      })
      .sort({ createdAt: -1 })
      .lean();

    const formattedOrders = orders.map((order: any) => ({
      _id: order._id.toString(),
      user: order.userId
        ? {
            _id: order.userId._id?.toString(),
            name: order.userId.name,
            email: order.userId.email,
          }
        : null,

      items: order.items.map((item: any) => ({
        productId: item.productId?.toString(),
        productName: item.productName,
        productImage: item.productImage,
        quantity: item.quantity,
        priceAtPurchase: item.priceAtPurchase,
      })),

      shippingAddress: order.shippingAddress
        ? {
            _id: order.shippingAddress._id?.toString(),
            name: order.shippingAddress.Name,
            mobileNumber: order.shippingAddress.MobileNumber,
            pinCode: order.shippingAddress.PinCode,
            address: order.shippingAddress.Address,
            city: order.shippingAddress.City,
            landMark: order.shippingAddress.LandMark,
            state: order.shippingAddress.State,
            country: order.shippingAddress.Country,
          }
        : null,

      totalAmount: order.totalAmount,
      paymentMethod: order.paymentMethod,
      paymentStatus: order.paymentStatus,
      transactionId: order.transactionId,
      orderStatus: order.orderStatus,
      orderDate: order.orderDate,
      deliveredAt: order.deliveredAt,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
    }));

    return NextResponse.json(formattedOrders, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Failed to fetch orders", error: error.message },
      { status: 500 }
    );
  }
}
