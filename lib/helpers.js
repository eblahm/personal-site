'use strict';

var config = require('../config.json'),
	_ = require('lodash'),
	meta = require('../content/meta.json'),
	moment = require('moment');

var allTags = {};

module.exports = {
	loadGlobals: function () { _.assign(this, config); },
	dateFormat: function(format, date) {
		return moment(date).format(format);
	},
	eq: function(i1, i2, options) {
		return i1 === i2? options.fn(this) : options.inverse(this);
	},
	data: function(dir, slug, options) {
		var data = meta[dir] || {};
		var articleMeta = data[slug] || {};
		_.assign(this, articleMeta);
		return options.fn(this);
	},
	labelStyle: function(tag) {
		var styles = [
			'default', 'primary', 'success',
			'info', 'warning', 'danger'
		];
		var style = allTags[tag];
		if (!style) {
			style = styles[ _.keys(allTags).length % styles.length ];
			allTags[tag] = style;
		}
		return 'label-' + style;
	},

	stars: function(arg) {
		var arg = arg.split('&'),
				stars = parseInt(arg[0], 10),
				half = arg.length > 1? stars : false,
				normal = '',
				nonStar = '-o',
				halfStar = '-half-o',
				i = 0;

		var allStars = _.times(5, function(n) {
			var type = normal;
			if (n === half) {
				type = halfStar;
			} else if (n >= stars) {
				type = nonStar;
			}
			return _.template('<i class="fa fa-star${type}"></i>', {
				type: type
			});
		}).join('');

		return _.template('<span class="stars">${allStars}</span>', {
			allStars: allStars
		});
	}

};
