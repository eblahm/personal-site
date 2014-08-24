
var _ = require('lodash'),
		fs = require('fs'),
		path = require('path'),
		moment = require('moment'),
		DATAROOT = path.join(__dirname, '/../content/');

module.exports = function(grunt) {
	grunt.registerTask('meta', 'generate meta', function() {
		var done = this.async();
		var dirs = _.filter(fs.readdirSync(DATAROOT), function(item){
			return item.indexOf('.') === -1;
		});

		var data = _.reduce(dirs, function(obj1, dir) {
			obj1[dir] = _.reduce(fs.readdirSync(path.join(DATAROOT, dir)), function(obj2, file) {
				if (!/.+\.md$/.test(file)) return obj2;
				var contents = fs.readFileSync(path.join(DATAROOT, dir, file));
				var comment = /^<!--([^]*)-->/i;
				var meta = comment.exec(contents.toString());
				var slug = file.toString().replace('.md', '');
				if (meta) {
					meta = JSON.parse(meta[1]);
					meta.date = moment(meta.date, 'MM-DD-YYYY').toDate();
				}
				meta = meta || {};
				if (!meta.title) meta.title = slug;
				obj2[slug] = meta;
				return obj2;
			}, {});
			return obj1;
		}, {});
		fs.writeFileSync(path.join(DATAROOT, 'meta.json'), JSON.stringify(data, undefined, 2));
		done();
	});

};