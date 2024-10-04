const mongoose = require('mongoose');
require('dotenv').config();

// MongoDB connection
//const mongoUrl = process.env.MONGODB_URL_LOCAL // Removed deprecated options

const mongoUrl = process.env.MONGODB_URL
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
