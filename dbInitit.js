import mongoose from 'mongoose';

const dbInit = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, { dbName: 'blog' });
    console.log(`Connected to MongoDB: ${conn.connection.name}`);
  } catch (error) {
    console.error(error);
    process.exit();
  }
};

export default dbInit;
