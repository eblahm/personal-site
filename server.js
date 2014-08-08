#!/usr/bin/env node
'use strict';

var debug = require('debug')('personal-site'),
	express = require('express'),
	path = require('path'),
	logger = require('morgan'),
	cookieParser = require('cookie-parser'),
	bodyParser = require('body-parser'),
	hogan = require('hogan-express'),
	routes = require('./routes'),
	config = require('./config.json'),
	helpers = require('./lib/helpers'),
	_ = require('lodash'),
	app = express();

// view engine setup
app.engine('html', hogan);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.set('layout', 'decorator');

app.use(logger('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req, res, next) {
	res.templateValues = _.assign(config, helpers);
	next();
});

app.get('/', routes.main.landing);
app.get('/:page', routes.main.page);
app.get('/writing/:article', routes.main.article);
app.use(routes.notFound);

var server = app.listen(config.PORT, function() {
	debug('Express server listening on port ' + server.address().port);
});