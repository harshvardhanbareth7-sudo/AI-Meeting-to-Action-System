const WebSocket = require('ws');

let wss;
const clients = new Set();

function initWs(httpServer) {
  wss = new WebSocket.Server({ server: httpServer });

  wss.on('connection', (socket) => {
    clients.add(socket);
    socket.on('close', () => clients.delete(socket));
  });
}

function broadcast(data) {
  const payload = JSON.stringify(data);
  for (const socket of clients) {
    if (socket.readyState === WebSocket.OPEN) socket.send(payload);
  }
}

module.exports = {
  initWs,
  broadcast,
};

