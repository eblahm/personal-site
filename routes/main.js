

var _ = require('lodash'),
	notFound = require('./notFound'),
	meta = require('../lib/meta'),
	path = require('path'),
	fs = require('fs'),
	marked = require('marked');

marked.setOptions({
	gfm: true,
	breaks: true,
	sanitize: false
});

exports.landing = function(req, res) {
	res.render('home', res.templateValues);
};

exports.page = function(req, res) {
	var page = req.params.page;
	if (/(resume|software|translation-work|writing)/.test(page)) {
		res.render(page, _.assign(res.templateValues, {
			title: page,
			page: page
		}));
	}
	else {
		notFound(req, res);
	}
};

exports.article = function(req, res) {
	var article = fs.readFileSync(path.dirname(__dirname) + "/views/articles/" + req.params.article + ".md", 'utf8');
	res.templateValues = _.assign(res.templateValues, meta[req.params.article]);
	res.render('article', _.assign(res.templateValues, {
		page: 'writing',
		article: marked(article)
	}));
};

