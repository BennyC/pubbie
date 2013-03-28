module.exports = (grunt) ->

  grunt.initConfig
    pkg: grunt.file.readJSON("package.json")
    meta:
      build: "build/**/*.js"
      src: "src/**/*.coffee"
      specs: "spec/**/*.js"
      banner: "/*! <%= pkg.name %> <%= grunt.template.today('yyyy-mm-dd') %> */\n"

    clean: ["<%= meta.build %>"]

    uglify:
      options:
        banner: "<%= meta.banner %>"
      build:
        src: "build/<%= pkg.name %>.js"
        dest: "build/<%= pkg.name %>.min.js"

    jasmine:
      pivotal:
        src: "<%= meta.build %>"
        options:
          specs: "spec/*Spec.js"
          helpers: "spec/*Helper.js"

    coffee:
      compile:
        files:
          "build/<%= pkg.name %>.js": "src/<%= pkg.name %>.coffee"

  grunt.loadNpmTasks "grunt-contrib-coffee"
  grunt.loadNpmTasks "grunt-contrib-clean"
  grunt.loadNpmTasks "grunt-contrib-jasmine"
  grunt.loadNpmTasks "grunt-contrib-uglify"
  grunt.loadNpmTasks "grunt-contrib-watch"

  grunt.registerTask "test", ["jasmine"]
  grunt.registerTask "default", ["clean", "coffee", "uglify", "test"]

