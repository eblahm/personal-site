
var fs = require('fs'),
	path = require('path'),
	_ = require('lodash'),
	moment = require('moment'),
	DATA_ROOT = path.join(path.dirname(__dirname), '/views/articles');

var files = fs.readdirSync(DATA_ROOT);
var data = _.reduce(files, function(ext, file) {
	var contents = fs.readFileSync(path.join(DATA_ROOT, file));
	var comment = /^<!--([^]*)-->/i;
	var meta = comment.exec(contents.toString());
	var slug = file.toString().replace('.md', '');
	if (meta) {
		meta = JSON.parse(meta[1]);
		meta.date = moment(meta.date, 'MM-DD-YYYY');
	}
	else {
		meta = {
			title: slug
		};
	}
	ext[slug] = meta;
	return ext;
}, {});

module.exports = data;
