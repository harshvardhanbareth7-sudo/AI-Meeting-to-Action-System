// PostgreSQL action "model" placeholder.
// Some systems separate "Task" (workflow item) from "Action" (deliverable/step).

class ActionModel {
  static tableName = 'actions';

  static columns = {
    id: 'uuid',
    meetingId: 'uuid',
    taskId: 'uuid',
    type: 'text',
    value: 'jsonb',
    createdAt: 'timestamptz',
    updatedAt: 'timestamptz',
  };
}

module.exports = {
  ActionModel,
};

