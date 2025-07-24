const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const validateApiKey = require('../middleware/validateApiKey');
const { ingestLog } = require('../controllers/logController');

router.post('/', auth, validateApiKey, ingestLog);

module.exports = router;
