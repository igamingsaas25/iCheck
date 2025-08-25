const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const fraudController = require('../controllers/fraudController');

router.get('/my', auth, fraudController.getMyFrauds);

module.exports = router;