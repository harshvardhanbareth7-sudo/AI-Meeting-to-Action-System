// PostgreSQL task "model" placeholder.
// Task represents an action item produced from meeting transcript + AI processing.

class TaskModel {
  static tableName = 'tasks';

  static columns = {
    id: 'uuid',
    meetingId: 'uuid',
    title: 'text',
    status: 'text',
    notes: 'text',
    createdAt: 'timestamptz',
    updatedAt: 'timestamptz',
  };
}

module.exports = {
  TaskModel,
};

