var mysql = require('mysql');

var db   = mysql.createConnection({
  host     : "localhost",
  user     : "root",
  password : "",
  database : "gosajang_db",
  multipleStatements: true
});

// var db   = mysql.createConnection({
//   connectionLimit    : 10,
//   host               : "db4free.net",
//   port               : 3306,
//   user               : "",
//   password           : "",
//   database           : "gosajang_db",
//   multipleStatements : true
// });

module.exports = {
  db: db
}
