const { db } = require('../firebase');

function calculatePoints(amount) {
  return Math.floor(amount / 10); // 1 point per KES 10
}

async function addPoints(phone, amount) {
  const points = calculatePoints(amount);
  const customerRef = db.collection('customers').doc(phone);

  await db.runTransaction(async (t) => {
    const snap = await t.get(customerRef);

    if (!snap.exists) {
      t.set(customerRef, {
        phone,
        points,
        totalSpent: amount,
        lastPurchase: new Date()
      });
    } else {
      const data = snap.data();
      t.update(customerRef, {
        points: data.points + points,
        totalSpent: data.totalSpent + amount,
        lastPurchase: new Date()
      });
    }
  });

  return points;
}

module.exports = { addPoints };
