

var _ = require('lodash'),
	notFound = require('./notFound'),
	meta = require('../content/meta.json');

exports.landing = function(req, res) {
	res.render('home', {
		title: 'Matthew Halbe',
		page: 'about'
	});
};

exports.page = function(req, res) {
	var page = req.params.page;
	if (/(resume|software|translation-work|writing)/.test(page)) {
		res.render(page, {
			title: page,
			page: page,
			articles: _.chain(meta['articles'])
			.map(function(props, slug) {
				props.slug = slug;
				return props;
			})
			.sortBy(function(props) {
				var val = new Date(props.date);
				return val.getTime() * -1;
			})
			.value()
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

