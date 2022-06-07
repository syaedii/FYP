var mysql = require('mysql');

// var db   = mysql.createConnection({
//   host     : "localhost",
//   user     : "root",
//   password : "",
//   database : "gosajang_db",
//   multipleStatements: true
// });

var mysqlConfig = {
  connectionLimit    : 100,
  host               : "us-cdbr-east-05.cleardb.net",
  user               : "bf682c29caf9b6",
  password           : "81f8793d",
  database           : "heroku_581b9dedc1d704f",
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

// var dbMain = mysql.createConnection({
//   host               : mysqlConfig.host,
//   user               : mysqlConfig.user,
//   password           : mysqlConfig.password,
//   database           : mysqlConfig.database
// });

module.exports = {
  db: db
  // dbMain: dbMain,
  // mysqlConfig: mysqlConfig
}
