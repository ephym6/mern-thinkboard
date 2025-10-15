import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
      await mongoose.connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.g9bmm85.mongodb.net/${process.env.MONGODB_DBNAME}?retryWrites=true&w=majority&appName=Cluster0`)
        console.log("MongoDB Connected Successfully")
  } catch (error) {
        console.error("MongoDB connection failed");
        console.error("Error details: ", error.message);
        if (error.code) console.error("Error code: ", error.code);
        process.exit(1); // Exit process with failure
  }
};

export default connectDB;