const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  quantity: Number,
  lowStockThreshold: Number, // e.g. 5
  alertSent: Boolean,        // prevents repeated SMS
  ownerPhone: String         // where SMS is sent
});

module.exports = mongoose.model('Product', productSchema);
