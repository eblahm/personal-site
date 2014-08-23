
var config = require('../config.json'),
	_ = require('lodash'),
	moment = require('moment');

module.exports = {
		loadGlobals: function () { _.assign(this, config); },
		dateFormat: function(format, date) {
			return moment(date).format(format);
		},
		eq: function(i1, i2, options) {
			return i1 === i2? options.fn(this) : options.inverse(this);
		}
};