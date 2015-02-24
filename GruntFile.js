
var appConfig = require('./config/app');

module.exports = function(grunt) {

    var tasks = {
        styles:  ['sass', 'autoprefixer'],
        scripts: ['requirejs'],
        watch:   ['watch']
    };
    tasks.all = [].concat(tasks.styles, tasks.scripts);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            dist: {
                options: {
                    sourcemap: 'auto',
                    style: 'compressed'
                },
                files: [
                    {
                        src: [
                            appConfig.paths.styles.input + '/site.scss'
                        ],
                        dest: appConfig.paths.styles.output + '/site.css'
                    }
                ]
            }
        },

        autoprefixer: {

            options: {
                browsers: ['last 8 versions', 'ie 8', 'ie 9']
            },

            single_file: {
                options: {},
                src: appConfig.paths.styles.output + '/site.css',
                dest: appConfig.paths.styles.output + '/site.css'
            },
            sourcemap: {
                options: {
                    map: true
                }
            }
        },
        requirejs: {
            compile: {
                options: {
                    baseUrl: appConfig.paths.scripts.input,
                    name: 'main',
                    mainConfigFile: appConfig.paths.scripts.input + '/main.js',
                    out: appConfig.paths.scripts.input + '/main-built.js',
                    generateSourceMaps: true,
                    preserveLicenseComments: false,
                    wrapShim: true,
                    inlineText: true,
                    optimize: 'uglify2',
                    paths: {
                        'jquery': 'empty:'
                    }
                }
            }
        },
        watch: {
            css: {
                files: '**/*.scss',
                tasks: tasks.styles
            }
        }
    });


    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-watch');


    grunt.registerTask('styles',  tasks.styles);
    grunt.registerTask('scripts', tasks.scripts);
    grunt.registerTask('watcher',   tasks.watch);
    grunt.registerTask('default', tasks.all);
};