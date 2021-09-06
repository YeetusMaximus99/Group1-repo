const con = require('../database.js');

//TODO: add to tbl_project
//TODO: confirm fields
const controller = {

    /** This function gets all the projects by to be displayed in home. 
     *  For all entries in the tbl_project, the client and project names are obtained from the tbl_clients using INNER JOIN
     */
    getTable: function(req, res) {
        var sql = 'SELECT c.client_name, c.project, p.Valuation_date FROM tbl_project_bkp p JOIN tbl_client_bkp c ON p.client_id = c.client_id ORDER BY	c.project';
        con.query(sql, function(err, data, fields) {
            if (err) throw err;
            console.log(data);
            res.render('home', { title: 'Project list', projectData: data });
        });
    },

    /**This function gets all the client names from tbl_clients to populate the dropdown options for the search */
    getSearch: function(req, res) {
        var sql = 'SELECT client_name FROM tbl_client_bkp';
        con.query(sql, function(err, data, fields) {
            if (err) throw err;
            console.log(data);
            res.render('search', { title: 'Search', dropdownData: data });
        });
    },

    /** The results from the search function are passed
     * The client and project names of the results from tbl_project are obtained from the tbl_clients using INNER JOIN
     * This function also gets all the client names from tbl_clients to populate the dropdown options for the search should the user wishes to search again
     */
    postSearch: function(req, res) {
        var srch = req.body.srchclients;
        console.log(srch);
        var sql = 'SELECT c.client_name, c.project, p.Valuation_date FROM tbl_project_bkp p JOIN tbl_client_bkp c ON p.client_id = c.client_id WHERE c.client_name = ' + con.escape(srch) + ' ORDER BY	c.project';
        var sql2 = 'SELECT client_name FROM tbl_client_bkp ORDER BY client_name';
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
        var sql = 'SELECT c.client_name, c.project, p.Valuation_date FROM tbl_project_bkp p JOIN tbl_client_bkp c ON p.client_id = c.client_id WHERE c.client_name = ' + con.escape(srch) + ' ORDER BY	c.project';
        var sql2 = 'SELECT client_name FROM tbl_client_bkp ORDER BY client_name';
        con.query(sql, function(err2, data2, fields) {
            if (err) throw err;
            console.log(data2);
            con.query(sql2, function(err2, data, fields2) {
                if (err2) throw err2;
                console.log(data);
                res.render('searchresults', { title: 'Search Results', projectData: data2, dropdownData: data });
            });
        });

    },

    getAddProject: function(req, res) {
        res.render('addproject');
    },

    postAddProject: function(req, res) {
        var clientname = req.body.clientname;
        var projname = req.body.projname;
        var contactperson = req.body.contactperson;
        var billingname = req.body.billingname;
        //var billingaddress = req.body.billingaddress;
        var billingemail = req.body.billingemail;
        var billingcc = req.body.billingcc;
        var sql2 = "SELECT * FROM tbl_client_bkp WHERE client_name LIKE" + con.escape(clientname) + " AND project LIKE " + con.escape(projname);
        var sql = "INSERT INTO tbl_client_bkp VALUES ( NULL, " + con.escape(clientname) + ", " +
            con.escape(projname) + ", " + con.escape(contactperson) + ", " + con.escape(billingname) + ", " +
            con.escape(billingemail) + ", " + con.escape(billingcc) + ") ";
        con.query(sql2, function(err, data, fields) {
            if (err) throw err;
            if (data.length <= 0) {
                con.query(sql, function(err, result) {
                    if (err) throw err;
                    console.log("1 record inserted");
                    res.render('addedscreen', { title: 'Success' });
                });
            } else {
                console.log("already exists!");
                res.render('addedscreen'); //<--temporary
            }
        })

    }


}
module.exports = controller;