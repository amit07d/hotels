const mongoose = require('mongoose');

// MongoDB connection
const mongoUrl = 'mongodb://localhost:27017/people'; // Removed deprecated options
mongoose.connect(mongoUrl); 
const db = mongoose.connection;

db.on('connected', () => {
  console.log('Connected to MongoDb server');
});

db.on('error', (err) => {
  console.error('MongoDb connection error:', err);
});

db.on('disconnected', () => { 
  console.log('MongoDb disconnected');
});

module.exports = db;
