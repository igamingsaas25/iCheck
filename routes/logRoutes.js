const express = require('express');
const router = express.Router();
const logController = require('../controllers/logController');
const auth = require('../middleware/auth');

router.post('/push', auth, logController.pushLog);
router.post('/push', apiKeyAuth, logController.pushLog);
router.get('/my', auth, logController.getMyLogs);

module.exports = router;