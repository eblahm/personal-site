

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
	res.render('home', {});
};

exports.page = function(req, res) {
	var page = req.params.page;
	if (/(resume|software|translation-work|writing)/.test(page)) {
		res.render(page, {
			title: page,
			page: page,
			articles: _.map(meta, function(props, slug) {
				props.slug = slug;
				return props
			})
		});
	}
	else {
		notFound(req, res);
	}
};

exports.article = function(req, res) {
	var markdownContent = fs.readFileSync(path.dirname(__dirname) + "/views/articles/" + req.params.article + ".md", 'utf8');
	var article = meta[req.params.article];
	article.content = marked(markdownContent);
	res.render('article', {
		page: 'writing',
		article: article
	});
};

