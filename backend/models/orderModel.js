// backend/models/orderModel.js

import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  items: { type: Object, required: true }, // Use array if needed
  totalAmount: Number,
  shippingInfo: {
    firstName: String,
    lastName: String,
    email: String,
    address: String,
    city: String,
    state: String,
    zip: String,
    country: String,
    mobile: String,
  },
  paymentMethod: String,
  status: { type: String, default: 'Placed' },
}, { timestamps: true });

export default mongoose.model('Order', orderSchema);
