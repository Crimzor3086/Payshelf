const Africastalking = require('africastalking');
const AT = Africastalking({
  username: process.env.AT_USERNAME,
  apiKey: process.env.AT_KEY
});
const sms = AT.SMS;
const payments = AT.PAYMENTS;

async function recordSale(req, res) {
  try {
    const db = req.app.locals.db;
    const { productID, quantity, customerPhone } = req.body;

    // Fetch product
    const productDoc = await db.collection('products').doc(productID).get();
    if (!productDoc.exists) return res.status(404).json({ error: 'Product not found' });

    const product = productDoc.data();
    const totalPrice = product.price * quantity;

    // Deduct inventory
    await db.collection('products').doc(productID).update({ stock: product.stock - quantity });

    // Record sale
    const saleRef = db.collection('sales').doc();
    await saleRef.set({ productID, quantity, totalPrice, customerPhone, paymentStatus: 'pending', timestamp: Date.now() });

    // Send SMS (receipt)
    const message = `Thank you for shopping at PayShelf. Product: ${product.productName}. Qty: ${quantity}. Total: KES ${totalPrice}.`;
    await sms.send({ to: [customerPhone], message });

    res.json({ message: 'Sale recorded and SMS sent', saleID: saleRef.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function paymentCallback(req, res) {
  // To handle payment confirmation callbacks from Africa’s Talking
  // Update sale's paymentStatus in DB
  res.send('Payment callback received');
}

module.exports = { recordSale, paymentCallback };
