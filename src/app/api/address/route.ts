import dbConnect from "@/lib/dbConnect";
import Address from "@/models/Address";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

// ============================
// 📦 GET - Fetch Addresses
// ============================
export async function GET(req: Request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    let query = {};
    if (userId && mongoose.Types.ObjectId.isValid(userId)) {
      query = { userId };
    }

    const addresses = await Address.find(query).sort({ createdAt: -1 });

    return NextResponse.json(
      { success: true, data: addresses },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message || "Internal server error" },
      { status: 500 }
    );
  }
}

// ============================
// 📝 POST - Create Address
// ============================
export async function POST(req: Request) {
  try {
    await dbConnect();
    const data = await req.json();

    // Validation for required fields
    const requiredFields = [
      "userId",
      "Name",
      "MobileNumber",
      "PinCode",
      "Address",
      "City",
    ];

    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json(
          { success: false, message: `${field} is required` },
          { status: 400 }
        );
      }
    }

    const newAddress = await Address.create({
      userId: data.userId,
      Name: data.Name,
      MobileNumber: data.MobileNumber,
      PinCode: data.PinCode,
      Address: data.Address,
      City: data.City,
      LandMark: data.LandMark || "",
      State: data.State || "",
      Country: data.Country || "",
      AltPhoneNumber: data.AltPhoneNumber || "",
    });

    return NextResponse.json(
      {
        success: true,
        message: "Address added successfully",
        data: newAddress,
      },
      { status: 201 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message || "Internal server error" },
      { status: 500 }
    );
  }
}
