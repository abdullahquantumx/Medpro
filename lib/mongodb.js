import mongoose from "mongoose";

export const connectMongoDB= async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "ProHealth",
    });

    console.log("Connected to MongoDB successfully!");
    
  } catch (error) {
    console.error("Failed to connect to the database");
    console.error(error);
  }
};
