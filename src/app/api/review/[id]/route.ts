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



export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const { id } = params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, message: "Invalid review ID" }, { status: 400 });
    }

    const existingReview = await Review.findById(id);
    if (!existingReview) {
      return NextResponse.json({ success: false, message: "Review not found" }, { status: 404 });
    }

    const formData = await req.formData();
    const title = formData.get("title") as string;
    const comment = formData.get("comment") as string;
    const rating = Number(formData.get("rating"));
    const existingImagesString = formData.get("existingImages") as string;
    let existingImages: string[] = [];

    try {
      existingImages = existingImagesString ? JSON.parse(existingImagesString) : [];
    } catch {
      existingImages = [];
    }

    const imageFiles = formData.getAll("images") as File[];
    const newImageUrls: string[] = [];

    for (const file of imageFiles) {
      if (typeof file === "string") continue;
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const uploadedImage = await new Promise<any>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "ecom_products/reviews",
            use_filename: true,
            unique_filename: true,
            resource_type: "image",
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(buffer);
      });

      newImageUrls.push(uploadedImage.secure_url);
    }

    // Combine existing + new images
    const finalImages = [...existingImages, ...newImageUrls];

    const updatedReview = await Review.findByIdAndUpdate(
      id,
      {
        ...(title && { title }),
        ...(comment && { comment }),
        ...(rating && { rating }),
        images: finalImages,
      },
      { new: true }
    );

    return NextResponse.json({ success: true, data: updatedReview }, { status: 200 });
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
