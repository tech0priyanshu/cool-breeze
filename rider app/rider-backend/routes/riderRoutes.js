const express = require('express');
const router = express.Router();
const riderController = require('../controllers/riderController');
const auth = require('../middleware/authMiddleware');

router.post('/login', riderController.loginRider);
router.get('/orders/:riderId', auth, riderController.getRiderOrders);
router.put('/order-status/:orderId', auth, riderController.updateOrderStatus);

module.exports = router;
