
module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		copy: {
			bower: {
				files: [{
					cwd: 'bower_components',
					src: ['jquery/dist/jquery.js'],
					dest: 'public/js/bower',
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
			scripts: {
				files: ['public/**/*.less'],
				tasks: ['less', 'autoprefixer'],
				options: {
					spawn: false
				}
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

	grunt.registerTask('default', ['copy:bower', 'less', 'jshint']);
	grunt.registerTask('run', ['less', 'concurrent:tasks']);

};
