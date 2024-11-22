const mongoose = require('mongoose');

// Define the schema
const userCreditSchema = new mongoose.Schema({
  uid: { 
    type: String, 
    required: true, 
    unique: true 
  },
  credit: { 
    type: Number, 
    required: true, 
    min: 0 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ // Ensures a valid email format
  },
  username: { 
    type: String, 
    required: true 
  }
}, { timestamps: true }); // Automatically adds createdAt and updatedAt timestamps

// Create the model
const UserCredit = mongoose.model('UserCredit', userCreditSchema, 'UserCredit');

// Export the model
module.exports = UserCredit;
