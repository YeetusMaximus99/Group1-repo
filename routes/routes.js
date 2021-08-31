// import module `express`
const express = require('express');
const app = express();

const controller = require('../controllers/controller.js');
app.set('view engine', 'ejs');
app.get('/', controller.getTable);

module.exports = app;