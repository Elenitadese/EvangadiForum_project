const mysql2 = require("mysql2");

const dbconnect = mysql2.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  connectionLimit: 10,
});
dbconnect.getConnection(function (err, connection) {
  console.log("database connected");
});
// module.exports = dbconnect.promise();