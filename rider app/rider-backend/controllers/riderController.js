const Rider = require('../models/Rider');
const Order = require('../models/Order');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// POST /api/rider/login
exports.loginRider = async (req, res) => {
  const { email } = req.body;
  const rider = await Rider.findOne({ email });
  if (!rider) return res.status(401).json({ message: 'Rider not found' });

  const token = jwt.sign({ riderId: rider._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
  res.json({ token, riderId: rider._id });
};

// GET /api/rider/orders/:riderId
exports.getRiderOrders = async (req, res) => {
  const { riderId } = req.params;
  const orders = await Order.find({ assignedRiderId: riderId });
  res.json(orders);
};

// PUT /api/rider/order-status/:orderId
exports.updateOrderStatus = async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;
  await Order.findByIdAndUpdate(orderId, { status });
  res.json({ message: 'Status updated successfully' });
};
