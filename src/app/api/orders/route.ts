import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Order from "@/models/Order";
import Product from "@/models/Product";
import Address from "@/models/Address";
import User from "@/models/User"; 
import mongoose from "mongoose";
import { placeOrder } from "@/lib/orderService";



export async function GET(req: Request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    let query = {};
    if (userId && mongoose.Types.ObjectId.isValid(userId)) {
      query = { userId };
    }

    const orders = await Order.find(query)
      .sort({ createdAt: -1 });

    return NextResponse.json({ success: true, data: orders }, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch orders" },
      { status: 500 }
    );
  }
}


export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();

    const { userId, items, shippingAddress, totalAmount, paymentMethod, paymentStatus, orderStatus } = body;

    if (!userId || !items || items.length === 0 || !shippingAddress || !totalAmount) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const userExists = await User.findById(userId);
    if (!userExists) {
      return NextResponse.json({ error: "Invalid user. User does not exist." }, { status: 400 });
    }

    const addressExists = await Address.findById(shippingAddress);
    if (!addressExists) {
      return NextResponse.json({ error: "Invalid address" }, { status: 400 });
    }

    if (String(addressExists.userId) !== String(userId)) {
      return NextResponse.json({ error: "Address does not belong to this user" }, { status: 403 });
    }

    // Filter out-of-stock items
    const validatedItems = [];
    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) continue; 
      if (item.quantity > (product.stock || 0)) continue; 

      validatedItems.push({
        productId: product._id,
        productName: product.name,
        productImage: product.thumbnail || "",
        quantity: item.quantity,
        priceAtPurchase: item.priceAtPurchase,
        discountPriceAtPurchase: item.discountPriceAtPurchase || null,
      });
    }

    if (validatedItems.length === 0) {
      return NextResponse.json(
        { error: "No items available in stock to place the order" },
        { status: 400 }
      );
    }

    const order = await placeOrder({
      userId,
      items: validatedItems,
      shippingAddress,
      totalAmount: validatedItems.reduce(
        (sum, it) =>
          sum + (it.discountPriceAtPurchase ?? it.priceAtPurchase) * it.quantity,
        0
      ),
      paymentMethod,
      paymentStatus,
      orderStatus,
    });

    return NextResponse.json(
      { success: true, message: "Order created successfully", order },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create order" },
      { status: 500 }
    );
  }
}




