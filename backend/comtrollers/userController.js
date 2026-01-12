const bcrypt = require('bcryptjs');

async function register(req, res) {
  try {
    const db = req.app.locals.db;
    const { name, phone, shopName, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);

    await db.collection('users').doc(phone).set({
      name, phone, shopName, passwordHash: hashed
    });
    res.json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function login(req, res) {
  try {
    const db = req.app.locals.db;
    const { phone, password } = req.body;
    const userDoc = await db.collection('users').doc(phone).get();

    if (!userDoc.exists) return res.status(404).json({ error: 'User not found' });
    const user = userDoc.data();
    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) return res.status(401).json({ error: 'Invalid credentials' });

    res.json({ message: 'Login successful', user: { name: user.name, shopName: user.shopName, phone: user.phone } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { register, login };
