module.exports = function (grunt) {

    // Config
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        watch: {
            livereload: {
                options: {
                    livereload: true,
                    tasks: ['stylus:compile', 'uglify', 'csscomb:foo', 'cssmin:minify']
                },
                files: ['*.html', 'assets/css/style.css', 'js/*.js']
            },

            css: {
                files: ['src/stylus/*.styl'],
                tasks: ['stylus:compile', 'csscomb:foo', 'cssmin:minify']
            },

            js: {
                files: ['src/js/common.js'],
                tasks: ['uglify']
            }
        },

        stylus: {

            compile: {
                options: {
                    compress: false,
                    paths: ['stylus']
                },
                files: {
                    'assets/css/style.css': 'src/stylus/style.styl'
                }
            }

        },

        uglify: {
            options: {
                mangle: false
            },
            target: {
                files: {
                    'assets/js/common.min.js': 'src/js/common.js'
                }
            }
        },

        csscomb: {
            options: {
                config: 'src/csscomb.json'
            },
            foo: {
                files: {
                    'assets/css/style.sorted.css': ['assets/css/style.css']
                }
            }
        },

        cssmin: {
            options: {
                keepSpecialComments: 0
            },
            minify: {
                files: {
                    'assets/css/style.min.css': ['assets/css/normalize.css', 'assets/css/style.sorted.css']
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-stylus');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-csscomb');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    // Our tasks
    grunt.registerTask('default', ['watch']);
    grunt.registerTask('comb', ['csscomb:foo', 'cssmin']);

};