import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
      await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB Connected Successfully")
  } catch (error) {
        console.error("MongoDB connection failed");
        console.error("Error details: ", error.message);
        if (error.code) console.error("Error code: ", error.code);
        process.exit(1); // Exit process with failure
  }
};

export default connectDB;