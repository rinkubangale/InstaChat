const express = require("express");
const app = express();
const http = require("http").createServer(app);
const path = require("path");

const PORT = process.env.PORT || 3000;

const io = require("socket.io")(http, { cors: { origin: "*" } });

http.listen(PORT, () => {
  console.log(`Listening to Port ${PORT}...`);
});

app.use(express.static(__dirname + "/public"));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

//socket connection
io.on("connection", (socket) => {
  console.log("user connected: " + socket.id);

  //broadcasting users message to all others
  socket.on("message", (payload) => {
    socket.broadcast.emit("message", payload);
  });
});
