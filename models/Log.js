const mongoose = require('mongoose');

const LocationSchema = new mongoose.Schema({
  country: String,
  region: String,
  city: String
}, { _id: false });

const MetaSchema = new mongoose.Schema({
  provider: String,
  platform: String,
  accountStatus: String,
  language: String,
  currency: String,
  regulatoryRegion: String,
  walletType: String,
  bonusBalance: Number,
  gameRoundId: String,
  transactionId: String,
  betType: String,
  status: String,
  bonusUsed: Boolean,
  resultType: String,
  details: String,
  jackpotWin: Boolean
}, { _id: false });

const LogSchema = new mongoose.Schema({
  eventType: { type: String, required: true, enum: ['getaccount', 'getbalance', 'wager', 'result'] },
  playerId: { type: String, required: true },
  timestamp: { type: Date, required: true },
  sessionId: String,
  ip: String,
  device: String,
  location: LocationSchema,
  game: String,
  currency: String,
  amount: Number,
  payout: Number,
  balance: Number,
  errorCode: String,
  meta: MetaSchema,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Log', LogSchema);