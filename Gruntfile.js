'use strict';

module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		copy: {
			bowerJS: {
				files: [{
					cwd: 'bower_components',
					src: [
						'jquery/dist/jquery.js'
					],
					dest: 'public/js/bower',
					expand: true,
					flatten: true
				}]
			},
			bowerCSS: {
				files: [{
					cwd: 'bower_components',
					src: [
						'normalize.css/*'
					],
					dest: 'public/css',
					expand: true,
					flatten: true
				}]
			}
		},
		jshint: {
			lib: {
				src: ['*.js', 'lib/**/*'],
				options: {
					jshintrc: true
				}
			},
			test: {
				src: ['test/**/*'],
				options: {
					jshintrc: true
				}
			}
		},
		less: {
			development: {
				options: {
					paths: [
						'public/less/mixins',
						'public/less'
					]
				},
				files: {
					'public/css/main.css': 'public/less/main.less'
				}
			}
		},
		autoprefixer: {
			options: {
				diff: true
			},
			run: {
				src: 'public/css/main.css'
			}
		},

		markdown: {
			all: {
				files: [
					{
						expand: true,
						src: 'content/articles/*.md',
						dest: 'views/articles/',
						ext: '.html',
						flatten: true
					}
				],
				options: {
					template: 'content/articles/template.html'
				}
			}
		},

		nodemon: {
			server: {
				script: 'server.js',
				options: {
					nodeArgs: ['--debug=5858'],
					env: {
						DEBUG: 'appServer'
					}
				}
			}
		},

		watch: {
			less: {
				files: ['public/**/*.less'],
				tasks: ['less', 'autoprefixer'],
				options: {
					spawn: false
				}
			},
			markdown: {
				files: ['content/**/*.md'],
				tasks: ['markdown', 'meta']
			}
		},

		concurrent: {
			tasks: ['nodemon:server', 'watch'],
			options: {
				logConcurrentOutput: true
			}
		}
	});


	grunt.loadNpmTasks('grunt-concurrent');
	grunt.loadNpmTasks('grunt-nodemon');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-markdown');
	grunt.loadTasks('tasks');

	grunt.registerTask('default', ['copy:bower', 'less', 'jshint', 'markdown', 'meta']);
	grunt.registerTask('run', ['less', 'concurrent:tasks']);

};
