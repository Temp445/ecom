import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Order from "@/models/Order";

export async function GET() {
  try {
    await dbConnect();

    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .lean();

    const formatted = orders.map((order: any) => ({
      _id: order._id.toString(),

      user: order.userId
        ? {
            _id: order.userId._id?.toString(),
            firstName: order.userId.firstName,
            lastName: order.userId.lastName,
            email: order.userId.email,
          }
        : null,

      items: order.items.map((item: any) => ({
        productId: item.productId?.toString(),
        productName: item.productName,
        productImage: item.productImage,
        quantity: item.quantity,
        priceAtPurchase: item.priceAtPurchase,
        discountPriceAtPurchase: item.discountPriceAtPurchase ?? 0,
        deliveryChargeAtPurchase: item.deliveryChargeAtPurchase ?? 0,
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

    return NextResponse.json(formatted, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Failed to fetch orders", error: error.message },
      { status: 500 }
    );
  }
}
