const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const opportunityRoutes = require('./routes/opportunityRoutes');
const applicationRoutes = require('./routes/applicationRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API routes
app.use('/api/opportunities', opportunityRoutes);
app.use('/api/applications', applicationRoutes);

// Home route
app.get('/', (req, res) => {
  res.send('Career Connect API is running');
});

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected successfully');

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection failed:', error.message);
  });
