module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        meta: {
            build: 'build/**/*.js',
            src: 'src/**/*.js',
            specs: 'spec/**/*.js'
        },

        clean: ['<%= meta.build %>'],

        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'src/<%= pkg.name %>.js',
                dest: 'build/<%= pkg.name %>.min.js'
            }
        },

        watch: {
            src: {
                files: ['<%= meta.src %>'],
                tasks: ['default']
            },
            test : {
                files: ['<%= meta.specs %>'],
                tasks: ['test']
            }
        },

        jasmine: {
            pivotal: {
                src: '<%= meta.build %>',
                options: {
                    specs: 'spec/*Spec.js',
                    helpers: 'spec/*Helper.js'
                }
            }
        }

    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');

    // Default task(s).
    grunt.registerTask('test', ['jasmine']);
    grunt.registerTask('default', ['clean', 'uglify', 'test']);

};
