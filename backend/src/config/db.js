import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
      await mongoose.connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.g9bmm85.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
        console.log("MongoDB Connected Successfully")
  } catch (error) {
        console.error("MongoDB connection failed", error);
        process.exit(1); // Exit process with failure
  }
};

export default connectDB;