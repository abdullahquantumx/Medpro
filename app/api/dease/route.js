import { connectMongoDB } from "@/libs/mongodb";
import { DiabetesCheck } from "@/models/diseases";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    // Extract the value of hasDiabetes from the request body
    const { hasDiabetes } = await request.json();

    // Connect to MongoDB
    await connectMongoDB();

    // Create a new record in the DiabetesCheck model
    const newDiabetesCheck = new DiabetesCheck({ hasDiabetes });
    await newDiabetesCheck.save();

    // Return a success message with status code 201
    return NextResponse.json({ message: "Diabetes record created" }, { status: 201 });
  } catch (error) {
    // If an error occurs, log it and return an error response with status code 500
    console.error(error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
