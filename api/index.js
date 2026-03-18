import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "../server/app.js";

dotenv.config({ path: "./server/.env" });

// Cache the connection across warm serverless invocations
let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;
  await mongoose.connect(process.env.MONGO_URL);
  isConnected = true;
};

export default async function handler(req, res) {
  await connectDB();
  return app(req, res);
}
