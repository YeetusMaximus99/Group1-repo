const con = require('../database.js');

//TODO: regex search
const controller = {

    getTable: function(req, res) {
        var sql = 'SELECT c.client_name, c.project, p.Valuation_date FROM tbl_project p JOIN tbl_client c ON p.client_id = c.client_id ORDER BY	c.project';
        con.query(sql, function(err, data, fields) {
            if (err) throw err;
            console.log(data);
            res.render('home', { title: 'Project list', projectData: data });
        });
    },

    getSearch: function(req, res) {
        var sql = 'SELECT client_name FROM tbl_client';
        con.query(sql, function(err, data, fields) {
            if (err) throw err;
            console.log(data);
            res.render('search', { title: 'Search', dropdownData: data });
        });
    },

    postSearch: function(req, res) {
        var srch = req.body.srchclients;
        console.log(srch);
        var sql = 'SELECT c.client_name, c.project, p.Valuation_date FROM tbl_project p JOIN tbl_client c ON p.client_id = c.client_id WHERE c.client_name = ' + con.escape(srch) + ' ORDER BY	c.project';
        var sql2 = 'SELECT client_name FROM tbl_client';
        con.query(sql, function(err, data2, fields) {
            if (err) throw err;
            console.log(data2);
            con.query(sql2, function(err2, data, fields2) {
                if (err2) throw err2;
                console.log(data);
                res.render('searchresults', { title: 'Search Results', projectData: data2, dropdownData: data });
            });
        });

    },

    searchResults: function(req, res) {
        var srch = req.body.srchclients;
        console.log(srch);
        var sql = 'SELECT c.client_name, c.project, p.Valuation_date FROM tbl_project p JOIN tbl_client c ON p.client_id = c.client_id WHERE c.client_name = ' + con.escape(srch) + ' ORDER BY	c.project';
        var sql2 = 'SELECT client_name FROM tbl_client';
        con.query(sql, function(err2, data2, fields) {
            if (err) throw err;
            console.log(data2);
            con.query(sql2, function(err2, data, fields2) {
                if (err2) throw err2;
                console.log(data);
                res.render('searchresults', { title: 'Search Results', projectData: data2, dropdownData: data });
            });
        });

    }


}
module.exports = controller;