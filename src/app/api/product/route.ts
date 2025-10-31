import dbConnect from "@/lib/dbConnect";
import cloudinary from "@/lib/cloudinary";
import Product from "@/models/Product";
import { NextResponse } from "next/server";
import { generatePathUrl } from "@/lib/pathUrl";


export async function GET(){

    try{
        await dbConnect();
        const products = await Product.find().sort({ uploadedAt: -1 }).populate("category", "_id Name");;
        return NextResponse.json({ success: true, data: products }, {status: 200})

    }catch (err: any){
        return NextResponse.json({ success: false, message: err.message || "Failed to fetch products"}, {status: 500})
    }
}

export async function POST(req: Request) {
    try{
        await dbConnect();
        const formData = await req.formData()

        const name = formData.get("name") as string;
        const description = formData.get("description") as string;
        const model = formData.get("model") as string;
        const brand = formData.get("brand") as string;
        const category = formData.get("category") as string;
        const price = Number(formData.get("price"));
        const discountPrice = Number(formData.get("discountPrice"));
        const stock = Number(formData.get("stock"));

    if (!name || !description || !price || !stock || !category) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }
    const pathUrl = generatePathUrl(name, 50)

    const existing = await Product.findOne({ $or: [{name}, {pathUrl}] });
    
    if (existing) {
        let message = ""
        if (existing.name === name) message = "Product Name already existing";
        else if (existing.pathUrl === pathUrl) message = "Path Url already existing";
        else message= "Duplicate Entry"

        return NextResponse.json({ success: false, message }, {status: 409});
    }
     

    // Upload Thumbnail
    const thumbnailFile = formData.get("thumbnail") as File | null;
    let thumbnailUrl = "";

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

      thumbnailUrl = uploadedThumb.secure_url;
    }

    // Upload Product Images 
    const imageFiles = formData.getAll("images") as File[];
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

    const product = await Product.create({
      name,
      pathUrl,
      description,
      model,
      brand,
      price,
      discountPrice,
      stock,
      thumbnail: thumbnailUrl,
      images: imageUrls,
      category
    })

    return NextResponse.json({ success: true, data: product} , {status: 201})
    }catch (err: any) {

    return NextResponse.json({ success: false, message: err.message || "Internal Server Error"}, {status: 500})
    }
}
