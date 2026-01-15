const { db } = require('../firebase');

exports.getSummary = async (req, res) => {
  try {
    const snapshot = await db
      .collection('sales')
      .where('status', '==', 'PAID')
      .get();

    let totalRevenue = 0;
    let totalSales = snapshot.size;

    snapshot.forEach(doc => {
      totalRevenue += doc.data().totalAmount;
    });

    res.json({
      totalRevenue,
      totalSales
    });

  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch analytics' });
  }
};

exports.dailySales = async (req, res) => {
  try {
    const snapshot = await db.collection('sales')
      .where('status', '==', 'PAID')
      .get();

    const daily = {};

    snapshot.forEach(doc => {
      const date = doc.data().createdAt.toDate
        ? doc.data().createdAt.toDate().toISOString().split('T')[0]
        : new Date(doc.data().createdAt).toISOString().split('T')[0];

      daily[date] = (daily[date] || 0) + doc.data().totalAmount;
    });

    res.json(daily);

  } catch (error) {
    res.status(500).json({ error: 'Daily analytics failed' });
  }
};

exports.topProducts = async (req, res) => {
  try {
    const snapshot = await db.collection('sales')
      .where('status', '==', 'PAID')
      .get();

    const products = {};

    snapshot.forEach(doc => {
      const sale = doc.data();
      products[sale.productName] =
        (products[sale.productName] || 0) + sale.quantity;
    });

    const ranked = Object.entries(products)
      .sort((a, b) => b[1] - a[1])
      .map(([name, quantity]) => ({ name, quantity }));

    res.json(ranked);

  } catch (error) {
    res.status(500).json({ error: 'Product analytics failed' });
  }
};
