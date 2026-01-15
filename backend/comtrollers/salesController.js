const { db } = require('../firebase');
const { payments, sms } = require('../services/africasTalking');
const { sendLowStockSMS } = require('../services/africasTalking');
const { addPoints } = require('../services/loyaltyService');
const { sendSMS } = require('../services/africasTalking');

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

      // Add loyalty points
      const pointsEarned = await addPoints(sale.customerPhone, sale.totalPrice);

      // Send SMS notification
      await sendSMS(
        sale.customerPhone,
        `🎉 PayShelf Rewards! You earned ${pointsEarned} points. Keep shopping to earn more!`
      );
    }

    res.status(200).send('Callback received');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error processing callback');
  }
};

exports.createSale = async (req, res) => {
  try {
    const { productId, quantitySold, customerPhone } = req.body;

    const productRef = db.collection('products').doc(productId);
    const productSnap = await productRef.get();

    if (!productSnap.exists) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const product = productSnap.data();
    const newQuantity = product.quantity - quantitySold;

    if (newQuantity < 0) {
      return res.status(400).json({ error: 'Insufficient stock' });
    }

    // Update stock
    await productRef.update({ quantity: newQuantity });

    const totalAmount = product.price * quantitySold;

    // Create sale with timestamp
    await db.collection('sales').add({
      productId,
      productName: product.name,
      quantity: quantitySold,
      unitPrice: product.price,
      totalAmount,
      status: 'PAID',
      createdAt: new Date()
    });

    // Loyalty Points
    const pointsEarned = Math.floor(totalAmount / 10);
    const customerRef = db.collection('customers').doc(customerPhone);
    const customerSnap = await customerRef.get();

    if (customerSnap.exists) {
      const customerData = customerSnap.data();
      await customerRef.update({
        points: customerData.points + pointsEarned,
        totalSpent: customerData.totalSpent + totalAmount,
        lastPurchase: new Date()
      });
    } else {
      await customerRef.set({
        phone: customerPhone,
        points: pointsEarned,
        totalSpent: totalAmount,
        lastPurchase: new Date()
      });
    }

    // Send SMS
    await sms.send({
      to: [customerPhone],
      message: `Thank you for your purchase! You've earned ${pointsEarned} points. Total points: ${customerSnap.exists ? customerSnap.data().points + pointsEarned : pointsEarned}.`
    });

    // 🔔 LOW STOCK CHECK
    if (
      newQuantity <= product.lowStockThreshold &&
      product.alertSent !== true
    ) {
      await sendLowStockSMS(
        product.ownerPhone,
        product.name,
        newQuantity
      );

      await productRef.update({ alertSent: true });
    }

    res.status(201).json({
      message: 'Sale completed',
      remainingStock: newQuantity
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Sale failed' });
  }
};

exports.getTotalSalesRevenue = async (req, res) => {
  try {
    const snapshot = await db.collection('sales').where('paymentStatus', '==', 'PAID').get();
    const totalRevenue = snapshot.docs.reduce((sum, doc) => sum + doc.data().totalPrice, 0);
    res.json({ totalRevenue });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to calculate total sales revenue' });
  }
};

exports.getSalesOverTime = async (req, res) => {
  try {
    const snapshot = await db.collection('sales').where('paymentStatus', '==', 'PAID').get();
    const salesByDate = {};
    snapshot.docs.forEach(doc => {
      const sale = doc.data();
      const date = new Date(sale.createdAt).toISOString().split('T')[0];
      if (!salesByDate[date]) salesByDate[date] = 0;
      salesByDate[date] += sale.totalPrice;
    });
    res.json(salesByDate);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to calculate sales over time' });
  }
};

exports.getBestSellingProducts = async (req, res) => {
  try {
    const snapshot = await db.collection('sales').where('paymentStatus', '==', 'PAID').get();
    const productSales = {};
    snapshot.docs.forEach(doc => {
      const sale = doc.data();
      if (!productSales[sale.productID]) productSales[sale.productID] = { name: '', quantity: 0 };
      productSales[sale.productID].quantity += sale.quantity;
    });
    const sortedProducts = Object.values(productSales).sort((a, b) => b.quantity - a.quantity);
    res.json(sortedProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to calculate best-selling products' });
  }
};

exports.getLowPerformingProducts = async (req, res) => {
  try {
    const snapshot = await db.collection('sales').where('paymentStatus', '==', 'PAID').get();
    const productSales = {};
    snapshot.docs.forEach(doc => {
      const sale = doc.data();
      if (!productSales[sale.productID]) productSales[sale.productID] = { name: '', quantity: 0 };
      productSales[sale.productID].quantity += sale.quantity;
    });
    const sortedProducts = Object.values(productSales).sort((a, b) => a.quantity - b.quantity);
    res.json(sortedProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to calculate low-performing products' });
  }
};
