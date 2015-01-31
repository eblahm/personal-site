'use strict';

module.exports = function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	res.render('error', {
		title: 'not Found',
		message: err.message,
		dev: process.ENV === 'development'
	});
};
