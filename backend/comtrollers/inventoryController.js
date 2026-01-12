async function addProduct(req, res) {
  try {
    const db = req.app.locals.db;
    const { productName, price, stock, lowStockThreshold } = req.body;

    const docRef = db.collection('products').doc();
    await docRef.set({ productName, price, stock, lowStockThreshold });
    res.json({ message: 'Product added', id: docRef.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function listProducts(req, res) {
  try {
    const db = req.app.locals.db;
    const snapshot = await db.collection('products').get();
    const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { addProduct, listProducts };
