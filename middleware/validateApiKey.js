const User = require('../models/User');

const validateApiKey = async (req, res, next) => {
  const apiKey = req.header('x-api-key');
  if (!apiKey) return res.status(401).json({ error: 'API key missing' });

  const user = await User.findOne({ apiKey });
  if (!user) return res.status(403).json({ error: 'Invalid API key' });

  req.user = user;
  next();
};

module.exports = validateApiKey;