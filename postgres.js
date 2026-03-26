const { Pool } = require('pg');
const env = require('../config/env');

let pool;

function getPool() {
  if (pool) return pool;

  if (!env.DATABASE_URL) {
    // Placeholder behavior: throw only when DB is actually requested.
    throw new Error('DATABASE_URL is not configured');
  }

  pool = new Pool({ connectionString: env.DATABASE_URL });
  return pool;
}

module.exports = {
  getPool,
};

