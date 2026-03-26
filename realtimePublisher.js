const { broadcast } = require('../ws/wsServer');

async function publishMeetingEvent({ meetingId, eventType, payload }) {
  // For now, broadcast directly to WebSocket clients.
  // Later you can switch this to Redis pub/sub fan-out.
  broadcast({
    type: 'meeting.event',
    meetingId,
    eventType,
    payload: payload || null,
    createdAt: new Date().toISOString(),
  });
}

module.exports = {
  publishMeetingEvent,
};

