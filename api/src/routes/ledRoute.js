const express = require('express');
const LedController = require('./../controllers/LedController');
const router = express.Router();

router.post(`/led/switch/:color`, LedController.switchLed);
router.post(`/led/on/:color`, LedController.onLed);
router.post(`/led/off/:color`, LedController.offLed);

module.exports = router;