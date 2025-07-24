const Log = require('../models/Log');

exports.ingestLog = async (req, res) => {
  try {
    const log = new Log({ ...req.body, createdBy: req.user._id });
    await log.save();
    res.status(201).json({ msg: 'Log saved' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
