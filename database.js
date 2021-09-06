var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "project_listing_bkp",
    dateStrings: true
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

module.exports = con;