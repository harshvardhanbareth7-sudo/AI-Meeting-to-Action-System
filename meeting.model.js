// PostgreSQL meeting "model" placeholder.
// Replace this with your preferred ORM (e.g., Prisma/Sequelize/Objection) or query-builder later.

class MeetingModel {
  static tableName = 'meetings';

  static columns = {
    id: 'uuid',
    status: 'text',
    createdAt: 'timestamptz',
    updatedAt: 'timestamptz',
  };
}

module.exports = {
  MeetingModel,
};

