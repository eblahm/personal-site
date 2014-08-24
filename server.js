#!/usr/bin/env node
'use strict';

var debug = require('debug')('personal-site'),
	express = require('express'),
	path = require('path'),
	logger = require('morgan'),
	cookieParser = require('cookie-parser'),
	bodyParser = require('body-parser'),
	hbs = require('express-hbs'),
	routes = require('./routes'),
	config = require('./config.json'),
	helpers = require('./lib/helpers'),
	_ = require('lodash'),
	app = express();


app.engine('.html', hbs.express3({
	defaultLayout: path.join(__dirname + '/views/layouts/main'),
	extname: '.html',
	helpers: helpers,
	layoutsDir: path.join(__dirname + '/views/layouts')
}));
_.each(helpers, function(fn, name){
	hbs.registerHelper(name, fn);
});
app.set('view engine', '.html');
app.set('views', path.join(__dirname, 'views'));

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
