const { Server } = require("socket.io");
const registerChatHandlers = require("./chat");
const { socketOptions } = require("../config/socket");

function initSocket(server) {
  const io = new Server(server, socketOptions);

  io.on("connection", (socket) => {
    console.log("New client connected:", socket.id);

    registerChatHandlers(io, socket);

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });

  return io;
}

module.exports = { initSocket };


