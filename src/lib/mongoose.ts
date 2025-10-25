import mongoose from 'mongoose';

const MONGODB_URI = process.env.DB_URL!;
const DB_NAME = 'ecom_db';

let isConnected = false;

const dbConnect = async () => {
  if (isConnected) return;

  try {
    await mongoose.connect(MONGODB_URI, { dbName: DB_NAME });
    isConnected = true;
    console.log(`MongoDB connected: ${DB_NAME}`);
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};

export default dbConnect;
