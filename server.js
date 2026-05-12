// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const morgan = require('morgan');
// const compression = require('compression');
// const helmet = require('helmet');
// const keepAlive = require('./keepAlive'); // ✅ Added

// // Load env vars
// dotenv.config();

// // Route imports
// const authRoutes = require('./routes/authRoutes');
// const serviceRoutes = require('./routes/serviceRoutes');
// const bookingRoutes = require('./routes/bookingRoutes');
// const userRoutes = require('./routes/userRoutes');

// const app = express();

// // Middleware
// app.use(helmet());
// app.use(compression());
// app.use(cors({
//   origin: '*',
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// }));
// app.use(express.json({ limit: '10mb' }));
// app.use(express.urlencoded({ extended: true }));
// app.use(morgan('dev'));

// // Database connection
// mongoose.connect(process.env.MONGODB_URI)
//   .then(() => console.log('✅ MongoDB Connected Successfully'))
//   .catch(err => {
//     console.error('❌ MongoDB Connection Error:', err.message);
//     process.exit(1);
//   });

// // API Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/services', serviceRoutes);
// app.use('/api/bookings', bookingRoutes);
// app.use('/api/users', userRoutes);

// // Health check
// app.get('/api/health', (req, res) => {
//   res.status(200).json({ 
//     status: 'success', 
//     message: 'Fixiya API is running',
//     timestamp: new Date().toISOString()
//   });
// });

// // 404 handler
// app.use((req, res) => {
//   res.status(404).json({ status: 'error', message: 'Route not found' });
// });

// // Error handler
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(err.status || 500).json({
//     status: 'error',
//     message: err.message || 'Internal Server Error',
//     ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
//   });
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`🚀 Fixiya Server running on port ${PORT}`);
//   console.log(`📱 API URL: http://localhost:${PORT}/api`);
  
//   // ✅ Keep Render awake (only in production)
//   if (process.env.NODE_ENV === 'production') {
//     keepAlive(`https://fixiya-backend-flutter-2.onrender.com`);
//     console.log('🔄 Keep-alive enabled');
//   }
// });



const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const compression = require('compression');
const helmet = require('helmet');
const keepAlive = require('./keepAlive');

// Load env vars
dotenv.config();

// Route imports
const authRoutes = require('./routes/authRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Middleware
app.use(helmet());
app.use(compression());
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Database connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB Connected Successfully'))
  .catch(err => {
    console.error('❌ MongoDB Connection Error:', err.message);
    process.exit(1);
  });

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/users', userRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'success', 
    message: 'Fixiya API is running',
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ status: 'error', message: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    status: 'error',
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Fixiya Server running on port ${PORT}`);
  console.log(`📱 API URL: ${process.env.NODE_ENV === 'production' ? 'https://fixiya-backend-flutter-4.onrender.com' : 'http://localhost:' + PORT}/api`);
  
  // ✅ Keep Render awake (only in production)
  if (process.env.NODE_ENV === 'production') {
    keepAlive(`https://fixiya-backend-flutter-4.onrender.com`);
    console.log('🔄 Keep-alive enabled');
  }
});