import Order from '../models/orderModel.js';

// Place a new order
export const PlaceOrder = async (req, res) => {
  try {
    const { items, totalAmount, shippingInfo, paymentMethod } = req.body;

    const newOrder = new Order({
      items,
      totalAmount,
      shippingInfo,
      paymentMethod,
    });

    await newOrder.save();
    res.status(201).json({ message: 'Order placed successfully', order: newOrder });
  } catch (error) {
    res.status(500).json({ message: 'Server error placing order' });
  }
};

// Get all orders (for user display or admin dashboard)
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 }); // latest orders first
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching orders' });
  }
};
