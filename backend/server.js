import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

// Route Imports
import productRoute from './routes/productRoute.js';
import userRoute from './routes/userRoute.js';
import orderRoute from './routes/orderRoute.js'; // ✅ Order route

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Body parser for JSON

// Routes
app.use('/api/products', productRoute);
app.use('/api/users', userRoute);
app.use('/api/orders', orderRoute); // ✅ Mount order route

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => console.log('❌ MongoDB connection error:', err));
