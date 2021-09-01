// import module `express`
const express = require('express');
const app = express();

const controller = require('../controllers/controller.js');
app.set('view engine', 'ejs');
app.get('/', controller.getTable);
app.get('/search', controller.getSearch);
app.post('/search', controller.postSearch);


module.exports = app;