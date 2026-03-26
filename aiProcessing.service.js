function generateSummaryPlaceholder(meetingState) {
  const chunks = meetingState.transcriptChunks || [];
  const tasks = meetingState.tasks || [];

  return {
    text:
      chunks.length > 0
        ? `Summary placeholder: received ${chunks.length} transcript chunk(s), ${tasks.length} task(s) tracked.`
        : 'Summary placeholder: no transcript received yet.',
    updatedAt: new Date().toISOString(),
  };
}

module.exports = {
  generateSummaryPlaceholder,
};

