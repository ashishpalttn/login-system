// src/server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes'); // Ensure correct path
const pool = require('../config/db');
const cookieParser = require('cookie-parser');
// require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

pool.connect()
  .then(() => console.log('Connected to the database'))
  .catch(err => console.error('Database connection error:', err));


app.use(cors(
  {
    origin: ['http://localhost:3000','http://localhost:3002','http://localhost:5000','http://localhost:5001'], // React app URL
    credentials: true, // Allow cookies
  }
));

app.use(bodyParser.json());
app.use(cookieParser());
console.log('login api hitting')


app.use('/api/auth', authRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);

});
