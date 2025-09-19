const Log = require('../models/Log');
const FraudDetection = require('../models/FraudDetection');

async function checkFraud(log, userId) {
  const frauds = [];

  // Example Rule: Same IP used by multiple playerIds
  const sameIpLogs = await Log.find({ ip: log.ip, playerId: { $ne: log.playerId } });
  if (sameIpLogs.length > 0) {
    frauds.push({
      logId: log._id,
      playerId: log.playerId,
      ruleViolated: 'Multi-Account / Account Sharing',
      description: 'Same IP used by multiple playerIds',
      details: { otherPlayerIds: sameIpLogs.map(l => l.playerId) },
      createdBy: userId
    });
  }

  // Save any detected fraud cases
  if (frauds.length > 0) {
    await FraudDetection.insertMany(frauds);
  }
}

// Supports both single and bulk log ingestion
exports.pushLog = async (req, res) => {
  try {
    let logs = req.body;

    // If a single log object is sent, wrap it in an array
    if (!Array.isArray(logs)) {
      logs = [logs];
    }

    // Attach createdBy to each log
    logs = logs.map(log => ({
      ...log,
      createdBy: req.userId
    }));

    // Insert all logs at once
    await Log.insertMany(logs);

    // Check each log for fraud
    for (const log of insertedLogs) {
      await checkFraud(log, req.userId);
    }

    res.status(201).json({ message: 'Logs saved successfully' });
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: err.message, errors: err.errors });
    }
    console.error('Bulk log push error:', err);
    res.status(500).json({ message: 'Server error' });
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