import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

if (!process.env.MONGODB_URL) {
  console.log("Please provide MONGODB_URL in the .env file.");
}

const ConnectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to DB");
  } catch (error) {
    console.log("mongoDB connection Error", error);
    process.exit(1);
  }
};
export default ConnectDB;
