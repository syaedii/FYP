var mysql = require('mysql');

// var db   = mysql.createConnection({
//   host     : "localhost",
//   user     : "root",
//   password : "",
//   database : "gosajang_db",
//   multipleStatements: true
// });

var db   = mysql.createConnection({
  connectionLimit    : 100,
  host               : "us-cdbr-east-05.cleardb.net",
  user               : "bf682c29caf9b6",
  password           : "81f8793d",
  database           : "heroku_581b9dedc1d704f",
  multipleStatements : true
});

module.exports = {
  db: db
}
