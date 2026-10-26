import mongoose from 'mongoose';

export const connectDB = async () => {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    console.log('⚠️  No MONGO_URI provided in .env - running in Local JSON Storage fallback mode.');
    console.log('💡 To connect MongoDB, add your connection string to backend/.env (e.g. MONGO_URI=mongodb://localhost:27017/sunvolt or Atlas URI)');
    return false;
  }

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`✅ MongoDB Connected successfully: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.error(`⚠️ MongoDB Connection Error: ${error.message}`);
    console.log('💡 Falling back to Local Storage mode so the server keeps running smoothly.');
    return false;
  }
};
