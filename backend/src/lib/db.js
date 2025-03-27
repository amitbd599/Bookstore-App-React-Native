import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    let cnn = await mongoose.connect(process.env.DATABASE);
    console.log(`DATABASE connected: ${cnn.connection.host}`);
  } catch (error) {
    console.log("Error connecting Database", error);
    process.exit(1);
  }
};
