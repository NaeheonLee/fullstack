const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const { join } = require("node:path");

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

// Object to map socket IDs to user nicknames
const connectedUsers = {};

io.on("connection", (socket) => {
  // Map the socket ID to the provided nickname when a user joins
  socket.on("set nickname", (name) => {
    connectedUsers[socket.id] = name;

    // Broadcast a connection notification to all other users
    socket.broadcast.emit("system message", `${name} joined the chat`);

    // Update the online roster for all connected clients
    io.emit("roster update", Object.values(connectedUsers));
  });

  socket.on("chat message", (msg) => {
    // Emit to everyone except the sender to support the client's optimistic UI
    socket.broadcast.emit("chat message", {
      username: connectedUsers[socket.id],
      text: msg,
    });
  });

  // Broadcast typing indicators to all other users
  socket.on("typing", () => {
    socket.broadcast.emit("typing", connectedUsers[socket.id]);
  });

  // Clear the typing indicator when the user stops
  socket.on("stop typing", () => {
    socket.broadcast.emit("stop typing");
  });

  socket.on("disconnect", () => {
    const name = connectedUsers[socket.id];

    if (name) {
      delete connectedUsers[socket.id];

      // Notify all remaining users that someone has left
      io.emit("system message", `${name} left the chat`);

      // Refresh the online roster to remove the disconnected user
      io.emit("roster update", Object.values(connectedUsers));
    }
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
