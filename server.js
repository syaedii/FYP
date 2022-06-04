/* --------------- NPM Package ---------------- */
require('dotenv').config();

const express = require("express");
const app = express();
const server = require("http").Server(app);
const { v4: uuidv4 } = require("uuid");
const mysql = require("mysql");
app.set("view engine", "ejs");
const io = require("socket.io")(server, {
  cors: {
    origin: '*'
  }
});
const { ExpressPeerServer } = require("peer");
const peerServer = ExpressPeerServer(server, {
  debug: true,
});

const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport"),
  LocalStrategy = require('passport-local').Strategy;
const fileUpload = require('express-fileupload');
// const _ = require('lodash');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(fileUpload({createParentPath: true}));
app.use("/peerjs", peerServer);
app.use(express.static("public"));

// Use express-session
app.use(session({
  secret: "Our little secret.",
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60*60*1000 } // max period 1 hour
}));

/* ---------- User-defined Module ------------- */
const connection = require("./lib/dbconn"); // DB 연결
const home = require('./routes/home');
const room = require('./routes/room');
//const user = require('./routes/user');

/* -------------------------------------------- */

//Checking DB conneciton
// db = connection.db;
// db.connect(function(err) {
//   if (err) throw err;
//   console.log("Database connected!");
// });

/* ------- Section for developing pages ------- */

app.get("/", (req, res) => {
  res.redirect(`/${uuidv4()}`);
});

// Homepage
app.get("/home", home.main);

// Exam room
app.get("/:room", room.main);

io.on("connection", (socket) => {
  socket.on("join-room", (roomId, userId, userName) => {
    socket.join(roomId);
    socket.to(roomId).broadcast.emit("user-connected", userId);
    socket.on("message", (message) => {
      io.to(roomId).emit("createMessage", message, userName);
    });

    socket.on('disconnect', () => {
      socket.to(roomId).broadcast.emit("user-disconnected", userId)
    })
  });
});

/* ----------------------------------- */

// Setting port
let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

// Server starter
server.listen(port, function() {
  console.log("Server has started at port " + port + ".");
});
