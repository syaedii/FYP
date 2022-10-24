/* DB Setup하는 방법
 * 1. 서버 시작 - nodemon dbsetup.js
 * 2. 브라우저 URL 창에서 localhost:3000/setup_db를 침
 * 3. 브라우저 URL 창에서 localhost:3000/populate_db를 침
 * 4. 위 작업을 한 후  ctrl + c로 서버를 종료
 * 4. 계속 코딩 작업을 하려면 메인 서버 시작 - nodemon server.js
 */

const express = require("express");
const mysql = require("mysql");
const connection = require("./lib/dbconn"); // db 상수 가져오기

const app = express();

// DB연결 체크
const db = connection.db;
db.connect(function(err) {
  if (err) throw err;
  console.log("Database connected!");
});

app.get("/setup_db", function(req, res) {
  var sql = `

  DROP TABLE IF EXISTS user;
  DROP TABLE IF EXISTS participant;
  DROP TABLE IF EXISTS session;

  CREATE TABLE \`user\` (
        user_id VARCHAR(30) NOT NULL,
        password VARCHAR(100) NOT NULL,
        name VARCHAR(50) NOT NULL,
        gender CHAR(1),
        birth DATE,
        email VARCHAR(50),
        phone VARCHAR(20),
        institution VARCHAR(50),
        ref_id VARCHAR(30),
        type CHAR(1),
        curr_state TINYINT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY(user_id)
  );

  CREATE TABLE participant (
        session_id INT UNSIGNED NOT NULL,
        user_id VARCHAR(30) NOT NULL,
        entry_time DATETIME,
        exit_time DATETIME,
        ip_address INT UNSIGNED,
        PRIMARY KEY(session_id, user_id)
  );

  CREATE TABLE session (
        session_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
        exam_date DATE NOT NULL,
        start_time TIME,
        end_time TIME,
        duration INT,
        subject VARCHAR(50),
        entry_code VARCHAR(36) NOT NULL,
        status TINYINT DEFAULT 0,
        host_id VARCHAR(30) NOT NULL,
        PRIMARY KEY(session_id)
  );

  ALTER TABLE participant ADD FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE;
  ALTER TABLE session ADD FOREIGN KEY (host_id) REFERENCES user(user_id) ON DELETE CASCADE;
  `

  db.query(sql, function(err, result) {
    if (err) {
      res.send("Database setup failed!");
      throw err;
    }
    console.log(result);
    res.send("Database setup success..");
  });
});

app.get("/populate_db", function(req, res) {
  var sql = `

    `
  db.query(sql, function(err, result) {
    if (err) {
      res.send("Data insertion failed!");
      throw err;
    }
    console.log(result);
    res.send("Data successfully populated.");
  });
});

app.listen(3000, function() {
  console.log("Server has started at port 3000.");
});
