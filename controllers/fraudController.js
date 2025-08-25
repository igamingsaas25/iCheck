const FraudDetection = require('../models/FraudDetection');

exports.getMyFrauds = async (req, res) => {
  try {
    const frauds = await FraudDetection.find({ createdBy: req.userId }).sort({ timestamp: -1 });
    res.status(200).json(frauds);
  } catch (err) {
    console.error('Get frauds error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};