/// <binding AfterBuild='zetzer:main' />
module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'src/<%= pkg.name %>.js',
                dest: 'build/<%= pkg.name %>.min.js'
            }
        },
        zetzer: {
            main: {
                options: {
//                    partials: "",
                    templates: "templates"
                },
                files: [
                  {
                      expand: true,
                      cwd: "",
                      src: "**/*.md",
                      dest: "",
                      ext: ".html",
                      flatten: false
                  }
                ]
            },
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-zetzer');


    // Default task(s).
    grunt.registerTask('default', ['zetzer']);

};