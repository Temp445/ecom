import { NextResponse } from "next/server";
import mongoose from "mongoose";
import dbConnect from "@/lib/dbConnect";
import Review from "@/models/Review";
import cloudinary from "@/lib/cloudinary";


export async function GET(
  req: Request,
  { params }: { params: Promise <{ id: string }> }
) {
  try {
    await dbConnect();
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid review ID" },
        { status: 400 }
      );
    }

    const review = await Review.findById(id)
      .populate("userId", "name email")
      .populate("productId", "name images price");

    if (!review) {
      return NextResponse.json(
        { success: false, message: "Review not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: review }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message || "Internal server error" },
      { status: 500 }
    );
  }
}



export async function DELETE(
  req: Request,
  { params }: { params: Promise <{ id: string }> }
) {
  try {
    await dbConnect();
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid review ID" },
        { status: 400 }
      );
    }

    const deletedReview = await Review.findByIdAndDelete(id);

    if (!deletedReview) {
      return NextResponse.json(
        { success: false, message: "Review not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Review deleted successfully" },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message || "Internal server error" },
      { status: 500 }
    );
  }
}
