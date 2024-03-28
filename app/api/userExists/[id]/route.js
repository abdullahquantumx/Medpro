import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import DiabetesCheck from "@/models/diseases";

export async function POST(req) {
  try {
    // Connect to MongoDB
    await connectMongoDB();

    // Parse request body
    const { email, hasDiabetes } = await req.json();

    // Find user by email
    const user = await User.findOne({ email }).select("_id");

    // Check if user exists
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Create new diabetic record
    const diabeticRecord = new DiabetesCheck({
      userId: user._id,
      hasDiabetes,
      checkedAt: new Date(),
    });

    // Save the diabetic record
    await diabeticRecord.save();

    return NextResponse.json({ message: "Diabetic record added successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
