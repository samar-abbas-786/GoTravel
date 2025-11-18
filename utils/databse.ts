import mongoose from "mongoose";

let isConnected = false;

const db = async () => {
  if (isConnected) {
    console.log("MongoDB already connected");
    return;
  }

  if (!process.env.MONGO_URI) {
    throw new Error("❌ MONGO_URI is missing in environment variables");
  }

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI!);

    isConnected = !!conn.connections[0].readyState;
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    throw new Error("Database connection failed");
  }
};

export default db;
