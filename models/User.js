// models/User.js
const mongoose = require( 'mongoose' );

const userSchema = new mongoose.Schema( {
  email: {
    type: String,
    required: true,
    unique: true
  },
  motDePasse: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: [ 'client', 'employee', 'manager' ],
    required: true
  }
} );

const User = mongoose.model( 'User', userSchema );

module.exports = {
  User
};