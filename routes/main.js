

var _ = require('lodash'),
	config = require('../config.json'),
	notFound = require('./notFound');

exports.landing = function(req, res) {
	res.render('home', _.assign(config, {}));
};

exports.page = function(req, res) {
	var page = req.params.page;
	if (/(resume|software|translation-work|writing)/.test(page)) {
		res.render(page, _.assign(config, {
			page: page,
			active: function() {
				return function(text) {
					if (text === page) return 'selected';
				}
			}
		}));
	}
	else {
		notFound(req, res);
	}
};

