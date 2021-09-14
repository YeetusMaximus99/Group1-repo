const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const routes = require('./routes/routes.js');
var cons = require('consolidate');

app.use(express.urlencoded({ extended: true }));

app.set('views', path.join(__dirname, '/views'));
<<<<<<< HEAD
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

=======
app.use(express.static('public'));
>>>>>>> 4d1c47cc10780b5417ea29c851d81c6bed56275c
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
app.get('/deleteproject/:client/:project', routes);
app.post('/deleteproject/:client/:project', routes);
//app.post('/searchresults', routes);

const server = app.listen(port, () => {
    console.log(`The application started on port ${port}`);
});