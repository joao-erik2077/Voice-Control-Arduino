const express = require('express');
const app = express();

const ledRoute = require('./routes/ledRoute');

app.use(ledRoute);

module.exports = app;