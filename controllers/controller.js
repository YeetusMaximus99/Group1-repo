const con = require('../database.js');

//TODO: Make separate page for search results
const controller = {

    getTable: function(req, res) {
        var sql = 'SELECT * FROM tbl_contracts';
        con.query(sql, function(err, data, fields) {
            if (err) throw err;
            res.render('home', { title: 'Project list', projectData: data });
        });
    },

    getSearch: function(req, res) {
        res.render('search');
    },

    postSearch: function(req, res) {
        var srch = req.body.searchproj;
        console.log(srch);
        var sql = 'SELECT * FROM tbl_contracts WHERE project_title =' + con.escape(srch),
            srch;
        con.query(sql, function(err, data, fields) {
            if (err) throw err;
            res.render('search', { title: 'Project list', projectData: data });
        });
    }

}
module.exports = controller;