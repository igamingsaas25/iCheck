const mongoose = require('mongoose');

const LogSchema = new mongoose.Schema({
  playerId: String,
  eventType: String,
  amount: Number,
  game: String,
  timestamp: Date,
  meta: Object,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Log', LogSchema);