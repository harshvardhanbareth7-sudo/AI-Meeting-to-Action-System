const meetings = new Map();

function createDefaultTasks() {
  const now = new Date().toISOString();
  return [
    { taskId: 'task-1', title: 'Draft action items', status: 'pending', notes: '', createdAt: now, updatedAt: now },
    { taskId: 'task-2', title: 'Assign owners / due dates', status: 'pending', notes: '', createdAt: now, updatedAt: now },
    { taskId: 'task-3', title: 'Confirm next steps', status: 'pending', notes: '', createdAt: now, updatedAt: now },
  ];
}

function getOrCreateMeeting(meetingId) {
  if (!meetings.has(meetingId)) {
    const now = new Date().toISOString();
    meetings.set(meetingId, {
      meetingId,
      startedAt: now,
      transcriptChunks: [],
      tasks: createDefaultTasks(),
      summary: null,
    });
  }

  return meetings.get(meetingId);
}

function getMeetingState(meetingId) {
  return getOrCreateMeeting(meetingId);
}

function startMeeting(meetingId) {
  // Reset meeting state for a new start request.
  const now = new Date().toISOString();
  meetings.set(meetingId, {
    meetingId,
    startedAt: now,
    transcriptChunks: [],
    tasks: createDefaultTasks(),
    summary: null,
  });

  return { meetingId, status: 'started', startedAt: now };
}

function addTranscriptChunk(meetingId, { chunk, sequence }) {
  const meetingState = getOrCreateMeeting(meetingId);

  meetingState.transcriptChunks.push({
    chunk,
    sequence: sequence !== undefined ? sequence : null,
    receivedAt: new Date().toISOString(),
  });

  return {
    meetingId,
    status: 'chunk_received',
    transcriptChunkCount: meetingState.transcriptChunks.length,
  };
}

function getTasks(meetingId) {
  const meetingState = getOrCreateMeeting(meetingId);
  return { meetingId, tasks: meetingState.tasks };
}

function updateTask(meetingId, taskId, patch) {
  const meetingState = getOrCreateMeeting(meetingId);
  const task = meetingState.tasks.find((t) => t.taskId === taskId);
  if (!task) {
    const err = new Error('Task not found');
    err.statusCode = 404;
    throw err;
  }

  const now = new Date().toISOString();
  if (patch.status !== undefined) task.status = patch.status;
  if (patch.title !== undefined) task.title = patch.title;
  if (patch.notes !== undefined) task.notes = patch.notes;
  task.updatedAt = now;

  return { meetingId, task };
}

function setSummary(meetingId, summary) {
  const meetingState = getOrCreateMeeting(meetingId);
  meetingState.summary = summary;
}

function getSummary(meetingId) {
  const meetingState = getOrCreateMeeting(meetingId);
  return { meetingId, summary: meetingState.summary || { text: 'No summary yet.', updatedAt: new Date().toISOString() } };
}

module.exports = {
  startMeeting,
  addTranscriptChunk,
  getTasks,
  updateTask,
  setSummary,
  getSummary,
  getMeetingState,
};

