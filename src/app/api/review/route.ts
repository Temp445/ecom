import { NextResponse } from "next/server";
import mongoose from "mongoose";
import dbConnect from "@/lib/dbConnect";
import cloudinary from "@/lib/cloudinary";
import Review from "@/models/Review";

export async function GET(req: Request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    let query = {};

    if (userId && mongoose.Types.ObjectId.isValid(userId)) {
      query = { userId };
    }

    const reviews = await Review.find(query)
      .sort({ createdAt: -1 })
      .populate("userId", "name email");

    return NextResponse.json({ success: true, data: reviews }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message || "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();

    const formData = await req.formData();

    const userId = formData.get("userId") as string;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const rating = Number(formData.get("rating")) || 1;

    if (!userId || !description) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    const imageFiles = formData.getAll("images") as File[];
    const imageUrls: string[] = [];

    for (const file of imageFiles) {
      if (typeof file === "string") continue; 

      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const uploadedImage = await new Promise<any>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "ecom_products/reviews",
            public_id: file.name.replace(/\.[^/.]+$/, ""),
            use_filename: true,
            unique_filename: false,
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(buffer);
      });

      imageUrls.push(uploadedImage.secure_url);
    }

    const newReview = await Review.create({
      userId,
      title,
      description,
      rating,
      images: imageUrls,
    });

    return NextResponse.json(
      { success: true, data: newReview },
      { status: 201 }
    );
  } catch (err: any) {
    console.error("Error uploading review:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Internal server error" },
      { status: 500 }
    );
  }
}
