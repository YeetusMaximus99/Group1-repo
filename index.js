const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
const routes = require('./routes/routes.js');
var cons = require('consolidate');

app.use(express.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, '/views'));
//app.set('layout', './partials/topbar')
app.set('view engine', 'ejs');
app.get('/', routes)
app.get('/search', routes);
app.post('/search', routes);
app.get('/addproject', routes);
app.post('/addproject', routes);
app.get('/queries', routes);
//app.post('/queries', routes);
app.get('/editproject/:client/:project', routes);
app.post('/editproject/:client/:project', routes);
//app.post('/searchresults', routes);

const server = app.listen(port, () => {
    console.log(`The application started on port ${port}`);
});