import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Order from "@/models/Order";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ orderId: string }> }
) {
  try {
    await dbConnect();

    const { orderId } = await params;

    const order = await Order.findById(orderId)
      .populate("userId", "firstName lastName email");

    if (!order)
      return NextResponse.json({ message: "Order not found" }, { status: 404 });

    const formattedOrder = {
      _id: order._id.toString(),
      orderId: order.orderId,
      user: order.userId
        ? {
            _id: order.userId._id.toString(),
            name: `${order.userId.firstName || ""} ${order.userId.lastName || ""}`.trim(),
            email: order.userId.email,
          }
        : null,

      items: order.items.map((item: any) => ({
        productId: item.productId?.toString(),
        productName: item.productName,
        productImage: item.productImage,
        quantity: item.quantity,
        priceAtPurchase: item.priceAtPurchase,
        discountAtPurchase: item.discountAtPurchase || 0,
        deliveryCharge: item.deliveryCharge || 0,
        itemStatus: item.itemStatus,
        courierPartner: item.courierPartner,
        trackingId: item.trackingId,
        expectedDelivery: item.expectedDelivery,
        deliveredAt: item.deliveredAt,
        cancelledAt: item.cancelledAt,
      })),

      shippingAddress: order.shippingAddress
        ? {
            name: order.shippingAddress.name,
            mobileNumber: order.shippingAddress.mobileNumber,
            pinCode: order.shippingAddress.pinCode,
            address: order.shippingAddress.address,
            city: order.shippingAddress.city,
            state: order.shippingAddress.state,
            landmark: order.shippingAddress.landmark,
            country: order.shippingAddress.country,
            addressType: order.shippingAddress.addressType,
          }
        : null,

      totalAmount: order.totalAmount,
      payableAmount: order.payableAmount,
      couponCode: order.couponCode,
      couponDiscount: order.couponDiscount,
      paymentMethod: order.paymentMethod,
      paymentStatus: order.paymentStatus,
      transactionId: order.transactionId,
      logisticsProvider: order.logisticsProvider,
      expectedDelivery: order.expectedDelivery,
      orderDate: order.orderDate,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
    };

    return NextResponse.json({ success: true, data: formattedOrder }, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching order:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch order details", error: error.message },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ orderId: string }> }
) {
  try {
    await dbConnect();

    const { orderId } = await params;
    const body = await req.json();
    const { itemUpdates, paymentStatus, logisticsProvider, trackingId, expectedDelivery } = body;

    const order = await Order.findById(orderId);
    if (!order)
      return NextResponse.json({ message: "Order not found" }, { status: 404 });

    // ✅ Update item statuses if provided
    if (Array.isArray(itemUpdates)) {
      order.items.forEach((item: any) => {
        const update = itemUpdates.find((u: any) => String(u.productId) === String(item.productId));
        if (update) {
          if (update.itemStatus) item.itemStatus = update.itemStatus;
          if (update.trackingId) item.trackingId = update.trackingId;
          if (update.courierPartner) item.courierPartner = update.courierPartner;
          if (update.expectedDelivery) item.expectedDelivery = new Date(update.expectedDelivery);
        }
      });
    }

    // ✅ Update global logistics info if provided
    if (logisticsProvider) order.logisticsProvider = logisticsProvider;
    if (expectedDelivery) order.expectedDelivery = new Date(expectedDelivery);

    // ✅ Update payment status if provided
    if (paymentStatus) order.paymentStatus = paymentStatus;

    await order.save();

    return NextResponse.json(
      { success: true, message: "Order updated successfully", order },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error updating order:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update order", error: error.message },
      { status: 500 }
    );
  }
}
