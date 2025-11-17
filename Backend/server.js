const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware must come **before routes**
app.use(cors());
app.use(express.json({ limit: '50mb' })); // Increased limit for image uploads
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Import routes
const homeRoutes = require('./Routes/homeRoutes');
const facultyRoutes = require('./Routes/Faculty-Exchange.js');
const studyTourRoutes = require('./Routes/studyTourRoutes.js');
const mobalityRoutes = require('./Routes/mobalityRoutes.js');
const globalPartnersRoutes = require('./Routes/globalpartnersroutes.js');

// Use routes
app.use('/api', homeRoutes);
app.use('/api/faculty', facultyRoutes);
app.use('/api/studytours', studyTourRoutes);
app.use('/api/mobality', mobalityRoutes);
app.use('/api/globalpartners', globalPartnersRoutes);

// Test route to check if server is running
app.get('/', (req, res) => {
  res.json({ 
    message: 'Server is running!',
    availableRoutes: {
      home: '/api',
      faculty: '/api/faculty',
      studyTours: '/api/studytours',
      mobality: '/api/mobality',
      globalPartners: '/api/globalpartners'
    }
  });
});

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/INTI')
  .then(() => {
    console.log("✅ Connected to MongoDB successfully");
    console.log("📊 Database: INTI");
  })
  .catch(err => {
    console.error("❌ MongoDB connection error:", err.message);
  });

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('❌ Error:', err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// Start server
app.listen(PORT, () => {
  console.log('\n========================================');
  console.log(`🚀 Server running on port ${PORT}`);
  console.log('========================================');
  console.log('📍 Available Routes:');
  console.log(`   - Home:            http://localhost:${PORT}/api`);
  console.log(`   - Faculty:         http://localhost:${PORT}/api/faculty`);
  console.log(`   - Study Tours:     http://localhost:${PORT}/api/studytours`);
  console.log(`   - Mobality:        http://localhost:${PORT}/api/mobality`);
  console.log(`   - Global Partners: http://localhost:${PORT}/api/globalpartners`);
  console.log('========================================\n');
});

module.exports = app;