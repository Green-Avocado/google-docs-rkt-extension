#!/bin/node
var proxy = require('express-http-proxy');
var express = require('express');
var app = express();

app.use('/rkt-help', express.static('public'));
app.use('/compile', proxy('localhost:8000'));
app.use('*', (req, res) => res.sendStatus(404));

app.listen(8443);

