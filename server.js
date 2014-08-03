#!/usr/bin/env node
'use strict';

var debug = require('debug')('appServer'),
	express = require('express'),
	path = require('path'),
	logger = require('morgan'),
	cookieParser = require('cookie-parser'),
	bodyParser = require('body-parser'),
	hogan = require('hogan-express'),
	routes = require('./routes'),
	config = require('./config.json'),
	app = express();


// view engine setup
app.engine('html', hogan);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.set('layout', 'decorator');

app.use(logger(app.get('env') === 'production'? 'combined': ':method :url :status :response-time ms - :res[content-length]'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', routes.home);


app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	res.render('error', {
		title: 'not Found',
		message: err.message,
		dev: app.get('env') === 'development'
	});
});

var server = app.listen(config.PORT, function() {
	debug('Express server listening on port ' + server.address().port);
});