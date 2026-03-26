/**
 * Request/response DTO placeholders for the Meeting-to-Action endpoints.
 * These are intentionally minimal scaffolding.
 */

/**
 * @typedef {Object} StartMeetingResponse
 * @property {string} meetingId
 * @property {'started'} status
 */

/**
 * @typedef {Object} ReceiveTranscriptChunkRequest
 * @property {string} chunk
 * @property {number=} sequence
 */

/**
 * @typedef {Object} ReceiveTranscriptChunkResponse
 * @property {string} meetingId
 * @property {'chunk_received'} status
 * @property {number} transcriptChunkCount
 * @property {boolean=} summaryUpdated
 */

module.exports = {};

