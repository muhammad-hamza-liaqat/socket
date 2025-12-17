function registerChatHandlers(io, socket) {
  const joinedRooms = new Set();

  socket.on("chat:join", (roomId) => {
    socket.join(roomId);
    joinedRooms.add(roomId);
    console.log(`Socket ${socket.id} joined room ${roomId}`);

    const greeting = {
      message: `Welcome to room! 🎉`,
      // message: `Welcome to room ${roomId}! 🎉`,
      user: "System",
      timestamp: Date.now(),
    };

    socket.emit("chat:message", greeting);
  });

  socket.on("chat:leave", ({ roomId }) => {
    if (!roomId || !joinedRooms.has(roomId)) {
      return;
    }

    socket.leave(roomId);
    joinedRooms.delete(roomId);
    console.log(`Socket ${socket.id} left room ${roomId}`);

    const info = {
      message: `You left room ${roomId}.`,
      user: "System",
      timestamp: Date.now(),
    };

    socket.emit("chat:message", info);
  });

  socket.on("chat:message", ({ roomId, message, user }) => {
    if (!roomId || !joinedRooms.has(roomId)) {
      const warning = {
        message: "You must join the room before sending messages.",
        user: "System",
        timestamp: Date.now(),
      };
      socket.emit("chat:message", warning);
      return;
    }

    const payload = {
      message,
      user,
      timestamp: Date.now(),
    };

    io.to(roomId).emit("chat:message", payload);
  });
}

module.exports = registerChatHandlers;


