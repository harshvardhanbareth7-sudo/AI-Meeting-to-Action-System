const http = require('http');

const { app } = require('./app');
const env = require('./config/env');
const { initWs } = require('./ws/wsServer');

const server = http.createServer(app);

initWs(server);

server.listen(env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`API listening on :${env.PORT}`);
});

