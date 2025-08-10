const User = require('../models/User');

module.exports = async (req, res, next) => {
  const { email, apiKey } = req.body; // or use req.headers if you prefer
  if (!email || !apiKey) {
    return res.status(401).json({ message: 'Email and API key required.' });
  }
  try {
    const user = await User.findOne({ email, apiKey });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or API key.' });
    }
    req.userId = user._id; // Attach userId for use in controllers
    next();
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
};