import dbConnect from "@/lib/dbConnect";
import Address from "@/models/Address";
import { NextResponse } from "next/server";


export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect();

    const address = await Address.findById(params.id);
    if (!address) {
      return NextResponse.json(
        { success: false, message: "Address not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: address }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message || "Internal server error" },
      { status: 500 }
    );
  }
}

// ============================
// ✏️ PUT - Update Address by ID
// ============================
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    const data = await req.json();

    const updatedAddress = await Address.findByIdAndUpdate(params.id, data, {
      new: true,
    });

    if (!updatedAddress) {
      return NextResponse.json(
        { success: false, message: "Address not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Address updated successfully", data: updatedAddress },
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
// 🗑️ DELETE - Delete Address by ID
// ============================
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();

    const deletedAddress = await Address.findByIdAndDelete(params.id);
    if (!deletedAddress) {
      return NextResponse.json(
        { success: false, message: "Address not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Address deleted successfully" },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message || "Internal server error" },
      { status: 500 }
    );
  }
}
