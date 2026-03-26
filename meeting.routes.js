const express = require('express');
const meetingController = require('../controllers/meeting.controller');

const router = express.Router();

// Start a new meeting session and initialize task state.
router.post('/:meetingId/start', meetingController.startMeeting);

// Receive transcript chunks (e.g., incremental ASR output).
router.post(
  '/:meetingId/transcript-chunks',
  meetingController.receiveTranscriptChunk
);

// Retrieve tasks derived/managed for a meeting.
router.get('/:meetingId/tasks', meetingController.getTasks);

// Update a task (status, notes, etc).
router.patch('/:meetingId/tasks/:taskId', meetingController.updateTask);

// Get meeting summary.
router.get('/:meetingId/summary', meetingController.getSummary);

module.exports = router;

