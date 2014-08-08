
var _ = require('lodash');

var helpers =  {
	active: function(text) {
		if (text === this.page) return 'selected';
	}
};


// this is weird...i know.  for some reason, which I don't understand
// helpers have to nested in anon callbacks according to express-hogan
// i don't like that so I wrote this reduce thing to abstract it away
module.exports = _.reduce(helpers, function(exp, fn, name) {
	exp[name] = function() {
		return fn;
	};
	return exp;
}, {});
