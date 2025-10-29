import dbConnect from "@/lib/dbConnect";
import cloudinary from "@/lib/cloudinary";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ pathUrl: string }> }
) {
  try {
    await dbConnect();
    const { pathUrl } = await params;

    const product = await Product.findOne({ pathUrl });

    if (!product) {
      return NextResponse.json(
        { success: false, message: "Product Not Found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: product }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message || "Internal Server" },
      { status: 500 }
    );
  }
}


export async function PUT(
  req: Request,
  { params }: { params: Promise <{ pathUrl: string }> } 
) {
  try {
    await dbConnect();

    const { pathUrl } = await params;
    const formData = await req.formData();

    const name = formData.get("name") as string ;
    const description = formData.get("description") as string;
    const model = formData.get("model") as string;
    const brand = formData.get("brand") as string;
    const category = formData.get("category") as string;
    const price = formData.get("price") ? Number(formData.get("price")) : undefined;
    const discountPrice = formData.get("discountPrice") ? Number(formData.get("discountPrice")) : undefined;
    const stock = formData.get("stock") ? Number(formData.get("stock")) : undefined;

    const product = await Product.findOne({ pathUrl });
    if (!product) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }

    if (name && name !== product.name) {
      const existing = await Product.findOne({ name });
      if (existing) {
        return NextResponse.json(
          { success: false, message: "Product name already exists" },
          { status: 409 }
        );
      }
      product.name = name;
    }

    if (description) product.description = description;
    if (model) product.model = model;
    if (brand) product.brand = brand;
    if (category) product.category = category;
    if (price !== undefined) product.price = price;
    if (discountPrice !== undefined) product.discountPrice = discountPrice;
    if (stock !== undefined) product.stock = stock;

    // Upload Thumbnail
    const thumbnailFile = formData.get("thumbnail") as File | null;
    if (thumbnailFile) {
      const buffer = Buffer.from(await thumbnailFile.arrayBuffer());

      const uploadedThumb = await new Promise<any>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "ecom_products/thumbnails",
            public_id: thumbnailFile.name.replace(/\.[^/.]+$/, ""),
            use_filename: true,
            unique_filename: false,
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );
        stream.end(buffer);
      });

      product.thumbnail = uploadedThumb.secure_url; 
    }

    // Upload Product Images
    const imageFiles = formData.getAll("images") as File[];
    if (imageFiles && imageFiles.length > 0) {
      const imageUrls: string[] = [];

      for (const file of imageFiles) {
        const buffer = Buffer.from(await file.arrayBuffer());
        const uploadedImage = await new Promise<any>((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              folder: "ecom_products/gallery",
              public_id: file.name.replace(/\.[^/.]+$/, ""),
              use_filename: true,
              unique_filename: false,
            },
            (error, result) => {
              if (error) return reject(error);
              resolve(result);
            }
          );
          stream.end(buffer);
        });

        imageUrls.push(uploadedImage.secure_url);
      }

      product.images = imageUrls;
    }

    await product.save();

    return NextResponse.json(
      { success: true, message: "Product updated successfully", data: product },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("Product update error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}


export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ pathUrl: string }> }
) {
  try {
    await dbConnect();

    const { pathUrl } = await params;
    const product = await Product.findOneAndDelete({ pathUrl });

    if (!product) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Product deleted Successfully" },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
