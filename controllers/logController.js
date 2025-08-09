const Log = require('../models/Log');

exports.pushLog = async (req, res) => {
  try {
    const logData = {
      playerId: req.body.playerId,
      eventType: req.body.eventType,
      amount: req.body.amount,
      game: req.body.game,
      timestamp: req.body.timestamp,
      meta: req.body.meta,
      createdBy: req.userId // Attach authenticated user's ID
    };
    const log = new Log(logData);
    await log.save();
    res.status(201).json({ message: 'Log saved successfully' });
  } catch (err) {
    console.error('Log push error:', err);
    res.status(500).json({ message:'Server error' });
  }
};

exports.getMyLogs = async (req, res) => {
  try {
    const logs = await Log.find({ createdBy: req.userId }).sort({ timestamp: -1 });
    res.status(200).json(logs);
  } catch (err) {
    console.error('Get logs error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};