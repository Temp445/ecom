import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Order from "@/models/Order";

export const dynamic = "force-dynamic"; 

export async function GET(req: Request, { params }: { params: Promise <{ id: string }> }) {
  try {
    await dbConnect();

    const { id } = await params

    const order = await Order.findById(id).sort({ createdAt: -1 });
    if (!order) {
      return NextResponse.json(
        { success: false, message: "Orders not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: order }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message || "Internal server error" },
      { status: 500 }
    );
  }
}