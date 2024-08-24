// src/server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes'); // Ensure correct path
const pool = require('./config/db');

const app = express();
const port = process.env.PORT || 5000;

pool.connect()
  .then(() => console.log('Connected to the database'))
  .catch(err => console.error('Database connection error:', err));

// app.use(cors({ origin: 'http://localhost:3000' }));  // Assuming React is running on port 3000

app.use(cors());
app.use(bodyParser.json());

console.log('login api hitting')


// Use authRoutes for routes starting with /api/auth
app.use('/api/auth', authRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);

});
