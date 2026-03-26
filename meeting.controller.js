const meetingToActionService = require('../services/orchestration/meetingToAction.service');

function assertMeetingId(meetingId) {
  if (!meetingId || typeof meetingId !== 'string') {
    const err = new Error('Invalid meetingId');
    err.statusCode = 400;
    throw err;
  }
}

async function startMeeting(req, res, next) {
  try {
    const { meetingId } = req.params;
    assertMeetingId(meetingId);

    const result = await meetingToActionService.startMeeting(meetingId, req.body || {});
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
}

async function receiveTranscriptChunk(req, res, next) {
  try {
    const { meetingId } = req.params;
    assertMeetingId(meetingId);

    const { chunk, sequence } = req.body || {};
    if (typeof chunk !== 'string' || chunk.trim().length === 0) {
      const err = new Error('Body must include a non-empty string field: chunk');
      err.statusCode = 400;
      throw err;
    }

    if (sequence !== undefined && typeof sequence !== 'number') {
      const err = new Error('If provided, sequence must be a number');
      err.statusCode = 400;
      throw err;
    }

    const result = await meetingToActionService.addTranscriptChunk(meetingId, { chunk, sequence });
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

async function getTasks(req, res, next) {
  try {
    const { meetingId } = req.params;
    assertMeetingId(meetingId);

    const result = await meetingToActionService.getTasks(meetingId);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

async function updateTask(req, res, next) {
  try {
    const { meetingId, taskId } = req.params;
    assertMeetingId(meetingId);

    if (!taskId || typeof taskId !== 'string') {
      const err = new Error('Invalid taskId');
      err.statusCode = 400;
      throw err;
    }

    const patch = req.body || {};
    const result = await meetingToActionService.updateTask(meetingId, taskId, patch);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

async function getSummary(req, res, next) {
  try {
    const { meetingId } = req.params;
    assertMeetingId(meetingId);

    const result = await meetingToActionService.getSummary(meetingId);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  startMeeting,
  receiveTranscriptChunk,
  getTasks,
  updateTask,
  getSummary,
};
