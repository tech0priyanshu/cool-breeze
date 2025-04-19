const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerName: String,
  address: String,
  status: { type: String, default: 'Shipped' },
  assignedRiderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Rider' }
});

module.exports = mongoose.model('Order', orderSchema);
