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
const user = require('./routes/user');
const home = require('./routes/home');
const exam = require('./routes/exam');

// const room = require('./routes/room');
// const account = require('./routes/account')

/* -------------------------------------------- */

//Checking DB conneciton
db = connection.db;
db.connect(function(err) {
  if (err) throw err;
  console.log("Database connected!");
});

/* ------- Section for developing pages ------- */

// Root
app.get("/", (req, res) => {
  res.redirect("/home");
});


// Homepage
app.get("/home", home.main);

app.get("/generate-code", (req, res) => {
  req.session.entry_code = `${uuidv4()}`;
  res.redirect("/home");
});

// Exam session creation
app.post("/create-session", exam.createSession);

// Enter exam room
app.get("/exam-room/:entryCode", exam.enterRoom);
app.get("/exam-room", (req, res) => { res.redirect('/home') });
app.post("/enter-room", (req, res) => {
  var entry_code = req.body.entry_code;
  res.redirect('/exam-room/' + entry_code);
});

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


// Signup, Login, Logout
app.get("/signup", user.signup);
app.post("/signup", user.signup);

app.get("/login", user.login);
app.post("/login", user.login);

app.get("/logout", user.logout);

// Profile
app.get("/profile", user.profile);
app.post("/profile", user.saveChanges);

// Enter Exam Room
app.get("/enter-session-instructor", exam.enter_instructor)
app.get("/enter-session-student", exam.enter_student)

// During Exam
app.get("/exam-instructor", exam.in_session_instructor);
app.get("/exam-student", exam.in_session_student);

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
