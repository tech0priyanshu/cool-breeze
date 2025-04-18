// backend/routes/orderRoute.js

import express from 'express';
import { PlaceOrder, getOrders } from '../controllers/orderController.js';

const router = express.Router();

router.post('/', PlaceOrder);
router.get('/', getOrders); // ✅ Fetch all orders

export default router;
