var mysql = require('mysql');

// var mysqlConfig   = {
//   host               : "localhost",
//   user               : "root",
//   password           : "",
//   database           : "gosajang_db",
//   multipleStatements : true
// }

var mysqlConfig = {
  connectionLimit    : 100,
  host               : "us-cdbr-east-06.cleardb.net",
  user               : "b5e2a88e9e7f4d",
  password           : "98396169",
  database           : "heroku_670c9f3f1322c44",
  multipleStatements : true,
  debug              : false
}

var db = mysql.createPool({
  connectionLimit    : mysqlConfig.connectionLimit,
  host               : mysqlConfig.host,
  user               : mysqlConfig.user,
  password           : mysqlConfig.password,
  database           : mysqlConfig.database,
  multipleStatements : mysqlConfig.multipleStatements,
  debug              : mysqlConfig.debug
});


module.exports = {
  db: db
}
