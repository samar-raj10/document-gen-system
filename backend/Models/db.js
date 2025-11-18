import mongoose from 'mongoose';
import dotenv from 'dotenv';
import process from 'process';

dotenv.config();

const mongo_url = process.env.MONGO_CONN;

// Ensure MONGO_CONN is provided in .env file
if (!mongo_url) {
  console.error('ERROR: MONGO_CONN environment variable is not set in .env file');
  console.error('Please add MONGO_CONN=your_mongodb_connection_string to your .env file');
  process.exit(1);
}

mongoose.connect(mongo_url)
  .then(() => {
    console.log('✓ MongoDB Connected Successfully');
  })
  .catch((err) => {
    console.error('✗ MongoDB Connection Error:', err.message);
    process.exit(1);
  });
