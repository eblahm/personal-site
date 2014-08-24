

var _ = require('lodash'),
	notFound = require('./notFound'),
	meta = require('../content/meta.json');

exports.landing = function(req, res) {
	res.render('home', {});
};

exports.page = function(req, res) {
	var page = req.params.page;
	if (/(resume|software|translation-work|writing)/.test(page)) {
		res.render(page, {
			title: page,
			page: page,
			articles: _.map(meta['articles'], function(props, slug) {
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
	var slug = req.params.article;
	res.render('articles/' + slug, {
		page: 'writing',
		slug: slug,
		layout: 'article'
	});
};

