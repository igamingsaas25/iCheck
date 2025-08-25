const mongoose = require('mongoose');

const FraudDetectionSchema = new mongoose.Schema({
  logId: { type: mongoose.Schema.Types.ObjectId, ref: 'Log', required: true },
  playerId: String,
  ruleViolated: String,
  description: String,
  timestamp: { type: Date, default: Date.now },
  details: Object,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('FraudDetection', FraudDetectionSchema);