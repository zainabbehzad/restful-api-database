const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();

const app = express();
app.use(express.json());

// Log the MongoDB URI for debugging
console.log('MONGODB_URI:', process.env.MONGODB_URI);

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.info('Connected to MongoDB');
    app.listen(3000, () => {
      console.info('Server running on port 3000');
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit process on connection error
  });

// Routes
app.use('/api/users', userRoutes);