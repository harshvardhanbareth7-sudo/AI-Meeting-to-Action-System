const { createClient } = require('redis');
const env = require('../config/env');

let client = null;

function createOrGetClient() {
  if (client) return client;

  // Lazily created; connection happens on first use.
  client = createClient({ url: env.REDIS_URL });
  client.on('error', () => {
    // Keep placeholder silent; wire logging later when needed.
  });

  return client;
}

async function getRedisClient() {
  const c = createOrGetClient();
  if (!c.isOpen) {
    await c.connect();
  }
  return c;
}

async function publish(channel, message) {
  // Minimal stub: if Redis is misconfigured, fail gracefully.
  try {
    const c = await getRedisClient();
    await c.publish(channel, message);
    return true;
  } catch (_e) {
    return false;
  }
}

module.exports = {
  getRedisClient,
  publish,
};

