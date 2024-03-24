import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTON_STRING);
    console.log("connected");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export { connectDB };
