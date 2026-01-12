const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Initialize Firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();
app.locals.db = db; // make db accessible in controllers

// Routes
app.use('/users', require('./routes/users'));
app.use('/inventory', require('./routes/inventory'));
app.use('/sales', require('./routes/sales'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`PayShelf backend running on port ${PORT}`));
