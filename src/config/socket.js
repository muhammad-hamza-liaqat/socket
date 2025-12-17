const SOCKET_CORS_ORIGIN =
  process.env.SOCKET_CORS_ORIGIN || "http://localhost:3000";

const socketOptions = {
  cors: {
    origin: SOCKET_CORS_ORIGIN,
    methods: ["GET", "POST"],
  },
};

module.exports = {
  socketOptions,
};


