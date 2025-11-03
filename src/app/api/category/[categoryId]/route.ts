import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Product from "@/models/Product";

export async function GET(
  req: Request,
  { params }: { params: { categoryId: string } }
) {
  try {
    await dbConnect();
    const products = await Product.find({ category: params.categoryId })
      .limit(8)
      .populate("category", "name")
      .sort({ createdAt: -1 });

    return NextResponse.json({ success: true, data: products });
  } catch (error) {
    console.error("Error fetching related products:", error);
    return NextResponse.json(
      { success: false, message: "Failed to load related products" },
      { status: 500 }
    );
  }
}
