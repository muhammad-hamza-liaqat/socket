require("dotenv").config();

const express = require("express");
const http = require("http");
const { initSocket } = require("./sockets");

const app = express();

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.end("Server is up and running");
});

app.get("/chat", (req, res) => {
  res.render("chat", { title: "Socket.io Chat Test" });
});

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);
initSocket(server);

server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}/`);
});