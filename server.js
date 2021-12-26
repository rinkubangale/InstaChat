const express = require("express");
const app = express();
const http = require("http").createServer(app);
const path = require("path");

const PORT = process.env.PORT || 3000;

const io = require("socket.io")(http, { cors: { origin: "*" } });

http.listen(PORT, () => {
  console.log(`Listening to Port ${PORT}...`);
});

// console.log(process.env.PORT);

app.use(express.static(__dirname + "/public"));
console.log("server se h:", path.join(__dirname, "/index.html"));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/index.html"));
});

io.on("connection", (socket) => {
  console.log("user connected: " + socket.id);
  socket.on("message", (payload) => {
    socket.broadcast.emit("message", payload);
  });
});
