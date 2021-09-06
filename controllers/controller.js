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
        var sql = 'SELECT DISTINCT client_name FROM tbl_client_bkp ORDER BY client_name';
        //fields
        //fields from tbl_project


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
        var fieldsarr = [];
        var fieldqueries = [];
        var srch = req.body.srchclients;
        //fields
        //fields from tbl_project
        var nxtval_fld = req.body.nxtval;
        fieldqueries.push(nxtval_fld);
        var additional_fld = req.body.additional;
        fieldqueries.push(additional_fld);
        var consultant_fld = req.body.consultant;
        fieldqueries.push(consultant_fld);
        var manila_fld = req.body.manila;
        fieldqueries.push(manila_fld);
        var datareceived_fld = req.body.datareceived;
        fieldqueries.push(datareceived_fld);
        var datefinalized_fld = req.body.datefinalized;
        fieldqueries.push(datefinalized_fld);
        var fee_fld = req.body.fee;
        fieldqueries.push(fee_fld);
        var billed_fld = req.body.billed;
        fieldqueries.push(billed_fld);
        var datebilled_fld = req.body.datebilled;
        fieldqueries.push(datebilled_fld);
        var ref_fld = req.body.ref;
        fieldqueries.push(ref_fld);
        var status_fld = req.body.status;
        fieldqueries.push(status_fld);
        var mailedby_fld = req.body.mailedby;
        fieldqueries.push(mailedby_fld);
        //var contact_fld = req.body.contact; //TODO: enable once contacts db is in db
        //from tbl_client
        var companyadd_fld = req.body.comapnyadd;
        fieldqueries.push(companyadd_fld);
        var billname_fld = req.body.billname;
        fieldqueries.push(billname_fld);
        var billadd_fld = req.body.billadd;
        fieldqueries.push(billadd_fld);
        var billemail_fld = req.body.billemail;
        fieldqueries.push(billemail_fld);
        var billcc_fld = req.body.billcc;
        fieldqueries.push(billcc_fld);
        var line_fld = req.body.line;
        fieldqueries.push(line_fld);

        console.log(srch);
        var sql = 'SELECT c.client_name, c.project, p.Valuation_date';
        var sqltbl = ' FROM tbl_project_bkp p JOIN tbl_client_bkp c ON p.client_id = c.client_id WHERE c.client_name = ' + con.escape(srch) + ' ORDER BY	c.project';

        for (var i = 0; i < fieldqueries.length; i++) {
            if (fieldqueries[i] == null)
                fieldsarr.push(0);
            else {
                sql = sql + fieldqueries[i];
                fieldsarr.push(1);
            }
        }


        console.log('fields[] = ' + fieldsarr);

        var sqlcomplete = sql + sqltbl;
        var sql2 = 'SELECT DISTINCT client_name FROM tbl_client_bkp ORDER BY client_name';

        console.log(sql);


        con.query(sqlcomplete, function(err, data2, fields) {
            if (err) throw err;
            console.log(data2);
            con.query(sql2, function(err2, data, fields2) {
                if (err2) throw err2;
                console.log(data);
                res.render('searchresults', { title: 'Search Results', projectData: data2, dropdownData: data, fieldData: fieldsarr });
            });
        });

    },

    searchResults: function(req, res) {
        var srch = req.body.srchclients;
        console.log(srch);
        var sql = 'SELECT c.client_name, c.project, p.Valuation_date FROM tbl_project_bkp p JOIN tbl_client_bkp c ON p.client_id = c.client_id WHERE c.client_name = ' + con.escape(srch) + ' ORDER BY	c.project';
        var sql2 = 'SELECT DISTINCT client_name FROM tbl_client_bkp ORDER BY client_name';
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
        var billingemail = req.body.billingemail;
        var billingcc = req.body.billingcc;
        var billingaddress = req.body.billingaddress;
        var statezip = req.body.statezip;
        var lineofwork = req.body.lineofbusiness;
        var companyaddress = req.body.companyaddress;

        var sql2 = "SELECT * FROM tbl_client_bkp WHERE client_name LIKE" + con.escape(clientname) + " AND project LIKE " + con.escape(projname);
        var sql = "INSERT INTO tbl_client_bkp VALUES ( NULL, " + con.escape(clientname) + ", " +
            con.escape(projname) + ", " + con.escape(contactperson) + ", " +
            con.escape(billingname) + ", " + con.escape(billingemail) + ", " +
            con.escape(billingcc) + ", " + con.escape(billingaddress) + ", " +
            con.escape(statezip) + ", " + con.escape(lineofwork) + ", " +
            con.escape(companyaddress) + ") ";

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