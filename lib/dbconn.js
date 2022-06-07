var mysql = require('mysql');

// var db   = mysql.createConnection({
//   host     : "localhost",
//   user     : "root",
//   password : "",
//   database : "gosajang_db",
//   multipleStatements: true
// });

var db   = mysql.createConnection({
  connectionLimit    : 60,
  host               : "box5916.bluehost.com",
  port               : 3306,
  user               : "hazeleas_team20",
  password           : "oAJCKqF)vT%f",
  database           : "hazeleas_gosajang",
  multipleStatements : true
});

module.exports = {
  db: db
}
