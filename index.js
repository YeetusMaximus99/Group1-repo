const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
const routes = require('./routes/routes.js');
var cons = require('consolidate');

app.use(express.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');
app.get('/', routes)

const server = app.listen(port, () => {
    console.log(`The application started on port ${port}`);
});