import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  console.log("connecting to database...");
  await mongoose.connect(<string>process.env.MONGO_URI);
};

export default connectDB;
