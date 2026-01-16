const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const { admin, db } = require('./Firebase');
const serviceAccount = require('./serviceAccountKey.json');

const app = express();

// CORS configuration - allow frontend from Netlify and localhost for development
const allowedOrigins = [
  process.env.FRONTEND_URL,
  'http://localhost:8080',
  'http://localhost:5173',
  'http://localhost:3000',
].filter(Boolean); // Remove undefined values

app.use(cors({
  origin: allowedOrigins.length > 0 
    ? (origin, callback) => {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV !== 'production') {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      }
    : true, // If no FRONTEND_URL is set, allow all origins (for development)
  credentials: true,
}));

app.use(bodyParser.json());

app.locals.db = db; // make db accessible in controllers

// Routes
app.use('/users', require('./routes/users'));
app.use('/inventory', require('./routes/inventory'));
app.use('/sales', require('./routes/sales'));
const analyticsRoutes = require('./routes/analytics');
app.use('/analytics', analyticsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`PayShelf backend running on port ${PORT}`));
