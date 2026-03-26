const express = require('express');

const healthRoutes = require('./health.routes');
const meetingRoutes = require('../modules/meeting-to-action/routes/meeting.routes');

const router = express.Router();

router.use('/', healthRoutes);
router.use('/meetings', meetingRoutes);

module.exports = router;

