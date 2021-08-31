const con = require('../database.js');

const controller = {

    getTable: function(req, res) {
        var sql = 'SELECT * FROM tbl_contracts';
        con.query(sql, function(err, data, fields) {
            if (err) throw err;
            res.render('home', { title: 'Project list', projectData: data });
        });
    }

}
module.exports = controller;