const con = require('../database.js');
const app = require('../routes/routes.js');
const { render } = require('../routes/routes.js');

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
        var contact_fld = req.body.contact;
        fieldqueries.push(contact_fld);
        //from tbl_client
        var companyadd_fld = req.body.companyadd;
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
        var sql = 'SELECT p.client_id, p.project_id, c.client_name, c.project, p.Valuation_date';
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
        var sql = 'SELECT p.client_id, p.project_id, c.client_name, c.project, p.Valuation_date FROM tbl_project_bkp p JOIN tbl_client_bkp c ON p.client_id = c.client_id WHERE c.client_name = ' + con.escape(srch) + ' ORDER BY	c.project';
        var sql2 = 'SELECT DISTINCT client_name FROM tbl_client_bkp ORDER BY client_name';
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

    },

    getQueries: function(req, res) {
        var proposal1 = 'SELECT * FROM `tbl_proposal` WHERE winning_bidder = "" AND tab_sheet = "";';
        var proposal2 = "SELECT * FROM `tbl_proposal` ORDER BY YEAR(date_submitted);";
        var contracts_active = "SELECT * FROM tbl_contracts WHERE end_date >= CURDATE();"
        var contracts_expired = "SELECT * FROM tbl_contracts WHERE end_date < CURDATE();";

        con.query(proposal1, function(err, data1) {
            con.query(proposal2, function(err, data2) {
                con.query(contracts_active, function(err, data3) {
                    con.query(contracts_expired, function(err, data4) {
                        if (err) throw err;
                        console.log(data2);
                        res.render('queries', { title: 'Queries', projectData1: data1, projectData2: data2, projectData3: data3, projectData4: data4 });
                    });
                });
            });
        });

    },

    //postQueries: function(req, res) {

    getEditProject: function(req, res) {

        console.log("pumasok d2");
        var clientid = req.params.client;
        var projectid = req.params.project;
        console.log("client: " + clientid + ", project: " + projectid);


        var sql = 'SELECT * FROM tbl_project_bkp p JOIN tbl_client_bkp c ON p.client_id = c.client_id WHERE p.client_id =' +
            con.escape(clientid) + ' AND p.project_id = ' + con.escape(projectid);

        con.query(sql, function(err, data, fields) {
            if (err) throw err;
            console.log("data =  " + data[0]);
            res.render('editproject', { title: 'Edit Data', editprojData: data });
        });
    },

    postEditProject: function(req, res) {
        var clientid = req.params.client;
        var projectid = req.params.project;
        var info = [clientid, projectid];


        var valuationdate = req.body.valuationdate;
        var nxtval = req.body.nxtval;
        var additional = req.body.additional;
        var consultant = req.body.consultant;
        var manila = req.body.manila;
        var datareceived = req.body.datareceived;
        var draftsent = req.body.draftsent;
        var datefinalized = req.body.finalizeddate;
        var duedate = req.duedate;
        var fee = req.body.fee;
        var ref = req.body.ref;
        var billed = req.body.billed;
        var datebilled = req.body.datebilled;
        var invoiceno = req.body.invoiceno;
        var status = req.body.status;
        var mailedby = req.body.mailedby;
        var comments = req.body.comments;
        //from tbl_clients
        var contact = req.body.contactperson;
        var companyadd = req.body.companyadd;
        var billname = req.body.billname;
        var billadd = req.body.billadd;
        var statezip = req.body.statezip;
        var billemail = req.body.billemail;
        var billcc = req.body.billcc;
        var line = req.body.line;
        var clientname = req.body.clientname;
        var projname = req.body.projname;



        var sqlupdate = 'UPDATE tbl_project_bkp p JOIN tbl_client_bkp c ON p.client_id = c.client_id '
        var sqlset = 'SET c.project = ' + con.escape(projname) + ", c.client_name = " + con.escape(clientname) +
            ", p.Valuation_Date = " + con.escape(valuationdate) + ", p.next_valuation_date = " + con.escape(nxtval) +
            ", p.Additional_Description = " + con.escape(additional) + ", p.miami_id = " + con.escape(consultant) +
            ", p.manila_id = " + con.escape(manila) + ", p.data_received = " + con.escape(datareceived) +
            ", p.draft_sent = " + con.escape(draftsent) + ", p.date_finalized = " + con.escape(datefinalized) +
            ", p.due_date = " + con.escape(duedate) + ", p.fee = " + con.escape(fee) +
            ", p.Ref = " + con.escape(ref) + ", p.billed_id = " + con.escape(billed) +
            ", p.date_billed = " + con.escape(datebilled) + ", invoice_number = " + con.escape(invoiceno) +
            ", p.status_id = " + con.escape(status) + ", p.mail_id = " + con.escape(mailedby) +
            ", c.contact = " + con.escape(contact) + ", c.company_add = " + con.escape(companyadd) +
            ", c.billing_name = " + con.escape(billname) + ", c.billing_address = " + con.escape(billadd) +
            ", c.state = " + con.escape(statezip) + ", c.billing_email = " + con.escape(billemail) +
            ", c.billing_cc = " + con.escape(billcc) + ", c.line = " + con.escape(line) +
            ", p.Comments = " + con.escape(comments);


        var sqlwhere = ' WHERE p.project_id = ' + con.escape(projectid) + " AND c.client_id = " + con.escape(clientid);
        var sql = sqlupdate + sqlset + sqlwhere;

        con.query(sql, function(err, result) {
            if (err) throw err;
            console.log(result.affectedRows + " record(s) updated");
            res.render('editedscreen', { title: 'updated', infoData: info });
        });

    },


    getDeleteProject: function(req, res) {

        console.log("pumasok d3");
        var projectid = req.params.project;
        var clientid = req.params.client;

        var sql = 'SELECT * FROM tbl_project_bkp WHERE client_id = ' +
            con.escape(clientid) + ' AND project_id = ' + con.escape(projectid);


        con.query(sql, function(err, data, fields) {
            if (err) throw err;
            console.log("data =  " + data[0]);
            res.render('deletescreen', { title: 'Delete Data', deleteData: data });

        });
    },


    postDeleteProject: function(req, res) {

        console.log("pumasok d4");
        var clientid = req.params.client;
        var projectid = req.params.project;
        var info = [clientid, projectid];

        console.log("client: " + clientid + ", project: " + projectid);

        var sql = "DELETE FROM tbl_project_bkp WHERE client_id = " + con.escape(clientid) + " AND project_id = " + con.escape(projectid);

        var sql2 = 'SELECT DISTINCT client_name FROM tbl_client_bkp ORDER BY client_name';
        con.query(sql, function(err, result) {
            if (err) throw err;
            console.log("Number of records deleted: " + result.affectedRows);
            con.query(sql2, function(err, data, fields) {
                if (err) throw err;
                console.log(data);
                res.render('search', { title: 'Search', dropdownData: data });
            });
        });

    },


}
module.exports = controller;