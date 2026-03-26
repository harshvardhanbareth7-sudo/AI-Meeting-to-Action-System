const taskManager = require('../task/taskManager.service');
const { generateSummaryPlaceholder } = require('../ai/aiProcessing.service');

async function startMeeting(meetingId, _options = {}) {
  taskManager.startMeeting(meetingId);
  return {
    meetingId,
    status: 'started',
  };
}

async function addTranscriptChunk(meetingId, { chunk, sequence }) {
  const chunkResult = taskManager.addTranscriptChunk(meetingId, { chunk, sequence });

  // Minimal structured orchestration:
  // - keep tasks as placeholders (taskManager already seeded them)
  // - update summary placeholder when transcript arrives
  const meetingState = taskManager.getMeetingState(meetingId);
  const summary = generateSummaryPlaceholder(meetingState);
  taskManager.setSummary(meetingId, summary);

  return {
    ...chunkResult,
    summaryUpdated: true,
  };
}

async function getTasks(meetingId) {
  const result = taskManager.getTasks(meetingId);
  return result;
}

async function updateTask(meetingId, taskId, patch) {
  const result = taskManager.updateTask(meetingId, taskId, patch);

  // Minimal: summary placeholder can be recalculated after update.
  const meetingState = taskManager.getMeetingState(meetingId);
  const summary = generateSummaryPlaceholder(meetingState);
  taskManager.setSummary(meetingId, summary);

  return {
    meetingId,
    task: result.task,
    summaryUpdated: true,
  };
}

async function getSummary(meetingId) {
  return taskManager.getSummary(meetingId);
}

module.exports = {
  startMeeting,
  addTranscriptChunk,
  getTasks,
  updateTask,
  getSummary,
};

