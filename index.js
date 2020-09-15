var app = require("express")();
const bodyParser = require("body-parser");
const http = require("http").Server(app);
var io = require("socket.io")(http);

app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let rooms = [];

app.get("/", (req, res) => {
  res.render("index", { rooms: rooms });
});

app.get("/:room", (req, res) => {
  rooms.push[req.params.room];
  res.render("room", { roomName: req.params.room });
});

io.on("connection", (socket) => {
  console.log("user comes");
  socket.emit("request", "welcome user");
  socket.on("create_room", (room) => {
    console.log(socket.id, room);
    io.emit("room_created", room);
  });
  socket.on("join", (room) => {
    console.log("join");
    socket.join(room);
  });
  socket.on("new_message", (room, msg) => {
    console.log(msg, room);
    io.sockets.in(room).emit("receive_msg", msg);
  });
  socket.on("disconnect", () => {
    console.log("user disconnect");
    console.log(rooms);
  });
});

http.listen(3000, () => {
  console.log("app is running on port 3000");
});
