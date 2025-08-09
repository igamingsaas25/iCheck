const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true }, 
  password: { type: String, required: true },
  apiKey: { type: String, required: true, unique: true }
}, { collection: 'usersdata' }); 

module.exports = mongoose.model('User', UserSchema);