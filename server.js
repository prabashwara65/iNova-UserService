const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./src/db/database');
const errorHandler = require('./src/middleware/errorHandler');
const cookieParser = require('cookie-parser');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3004;

connectDB();

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000'
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


// Routes
app.use('/api/auth', require('./src/routes/auth'));
app.use('/api/users', require('./src/routes/users'));

app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'user-service',
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

app.get('/', (req, res) => {
  res.json({
    name: 'iNova User Service',
    version: '1.0.0',
    endpoints: {
      users: '/api/users',
      health: '/health'
    }
  });
});

app.use((req, res) => {
  res.status(404).json({
    error: 'Route not found',
    message: `Cannot ${req.method} ${req.url}`
  });
});

app.use(errorHandler);

app.listen(PORT, '0.0.0.0', () => {
  console.log('iNova User Service');
  console.log(`Port: ${PORT}`);
  console.log(`API: http://0.0.0.0:3003/api/users`);
});
