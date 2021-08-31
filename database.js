var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "contracts_database",
    dateStrings: true
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

module.exports = con;