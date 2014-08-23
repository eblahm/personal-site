#!/usr/bin/env node
'use strict';

var debug = require('debug')('personal-site'),
	express = require('express'),
	path = require('path'),
	logger = require('morgan'),
	cookieParser = require('cookie-parser'),
	bodyParser = require('body-parser'),
	hbs = require('express3-handlebars'),
	routes = require('./routes'),
	config = require('./config.json'),
	_ = require('lodash'),
	app = express();

app.set('views', path.join(__dirname, 'views'));
app.engine('.html', hbs({
	defaultLayout: 'main.html',
	helpers: {
		loadGlobals: function () { _.assign(this, config); }
	}
}));
app.set('view engine', '.html');

app.use(logger('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', routes.main.landing);
app.get('/:page', routes.main.page);
app.get('/writing/:article', routes.main.article);
app.use(routes.notFound);

var server = app.listen(config.PORT, function() {
	debug('Express server listening on port ' + server.address().port);
});