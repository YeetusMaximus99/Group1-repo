// import module `express`
const express = require('express');
const app = express();

const controller = require('../controllers/controller.js');
app.set('view engine', 'ejs');
app.get('/', controller.getTable);
app.get('/search', controller.getSearch);
app.post('/search', controller.postSearch);
app.get('/addproject', controller.getAddProject);
app.post('/addproject', controller.postAddProject);
app.get('/queries', controller.getQueries);
app.post('/queries', controller.postQueries);

module.exports = app;