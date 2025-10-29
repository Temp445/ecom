import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Cart from "@/models/Cart";

export async function GET(req: Request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId)
      return NextResponse.json(
        { message: "User ID required" },
        { status: 400 }
      );

    const cart = await Cart.findOne({ userId }).populate("items.productId");

    if (!cart) return NextResponse.json({ cart: { items: [] } });

    return NextResponse.json({ cart }, { status: 200 });
  } catch (error) {
    console.error("Error fetching cart:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const { userId, productId, quantity } = body;

    if (!userId || !productId) {
      return NextResponse.json(
        { message: "userId and productId are required" },
        { status: 400 }
      );
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({
        userId,
        items: [{ productId, quantity: quantity || 1 }],
      });
    } else {
      const existingItem = cart.items.find(
        (item: { productId: { toString: () => any } }) =>
          item.productId.toString() === productId
      );

      if (existingItem) {
        return NextResponse.json({ success: true, message: "Already in cart" });
      }
    }
    cart.items.push({ productId, quantity });
    await cart.save();
    const populatedCart = await cart.populate("items.productId");

    return NextResponse.json({
      success: true,
      message: "Item added to cart",
      cart: populatedCart,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
