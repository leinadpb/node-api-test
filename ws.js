const socketIO = require('socket.io');

const socketServer = (serverToBind) => {
  const wsServer = socketIO(serverToBind);

  wsServer.on('connection', (clientSocket) => {
    //console.log('>> ', clientSocket);
    clientSocket.on('PING', (msg) => {
      // console.log('Received PING from ', clientSocket.handshake.headers);
      let now = new Date();
      // PONG is the event name
      clientSocket.emit('PONG', `PONG ${new Date()}`);
    });
  });

  return wsServer;
};

module.exports = socketServer;