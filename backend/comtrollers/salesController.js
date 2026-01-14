const { db } = require('../firebase');
const { payments, sms } = require('../services/africasTalking');

exports.initiatePayment = async (req, res) => {
  try {
    const { productID, quantity, customerPhone } = req.body;

    // 1️⃣ Get product
    const productDoc = await db.collection('products').doc(productID).get();
    if (!productDoc.exists) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const product = productDoc.data();
    const totalPrice = product.price * quantity;

    // 2️⃣ Create sale (PENDING)
    const saleRef = await db.collection('sales').add({
      productID,
      quantity,
      totalPrice,
      customerPhone,
      paymentStatus: 'PENDING',
      createdAt: Date.now(),
    });

    // 3️⃣ Trigger STK Push
    const paymentResponse = await payments.mobileCheckout({
      productName: process.env.AT_PRODUCT_NAME,
      phoneNumber: customerPhone,
      currencyCode: 'KES',
      amount: totalPrice,
      metadata: {
        saleId: saleRef.id,
      },
    });

    res.json({
      message: 'STK push sent',
      saleId: saleRef.id,
      paymentResponse,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

exports.paymentCallback = async (req, res) => {
  try {
    const data = req.body;

    /*
    data structure (important fields):
    data.status
    data.requestMetadata.saleId
    data.value.amount
    data.value.phoneNumber
    */

    const saleId = data.requestMetadata.saleId;

    if (data.status === 'Success') {
      // Mark sale as PAID
      await db.collection('sales').doc(saleId).update({
        paymentStatus: 'PAID',
        paidAt: Date.now(),
      });

      // Get sale + product
      const saleDoc = await db.collection('sales').doc(saleId).get();
      const sale = saleDoc.data();

      const productDoc = await db.collection('products').doc(sale.productID).get();
      const product = productDoc.data();

      // Deduct stock
      await db.collection('products').doc(sale.productID).update({
        stock: product.stock - sale.quantity,
      });

      // Send SMS receipt
      await sms.send({
        to: [sale.customerPhone],
        message: `PayShelf Receipt\nItem: ${product.productName}\nQty: ${sale.quantity}\nTotal: KES ${sale.totalPrice}\nThank you!`,
      });
    }

    res.status(200).send('Callback received');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error processing callback');
  }
};
