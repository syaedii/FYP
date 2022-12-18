/* --------------- NPM Package ---------------- */
require('dotenv').config(); // reference to any private variables

// Use the required packages to run the app
const express = require("express");
const app = express();
const server = require("http").Server(app);
const { v4: uuidv4 } = require("uuid");
const mysql = require("mysql");
app.set("view engine", "ejs"); // Package to set up web pages
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
const passport = require("passport"), // Package that handle login
  LocalStrategy = require('passport-local').Strategy;
// const _ = require('lodash');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(fileUpload({createParentPath: true}));
app.use("/peerjs", peerServer);
app.use(express.static("public"));

// Use express-session
// Create login session that allows the user to stay logged in for up to 1 hour
app.use(session({
  secret: "Our little secret.",
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60*60*1000 } // max period 1 hour
}));

/* ---------- User-defined Module ------------- */
const connection = require("./lib/dbconn"); // DB 연결
const user = require('./routes/user'); // Import backend js to handle user signup & login
const home = require('./routes/home'); // Import backend js to display home page
const exam = require('./routes/exam'); // Import backend js to handle exam related activity
const account = require('./routes/account') //

/* -------------------------------------------- */

//Importing DB pool
db = connection.db; // For database multiple query handling

/* ------- Section for developing pages ------- */

// Root
// Definite root as redirection to homepage
app.get("/", (req, res) => {
  res.redirect("/home");
});


// Homepage
app.get("/home", home.main); // Call the homepage backend and frontend files

// Generate unique exam room
app.get("/generate-code", (req, res) => {
  req.session.entry_code = `${uuidv4()}`;
  res.redirect("/home");
});

// Exam session creation
// Post request to handle exam session creation
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
