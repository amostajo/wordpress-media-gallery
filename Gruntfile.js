module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        // copy task
        copy: {
            dist: {
                files: [
                    // includes files within path
                    {
                        expand: true,
                        src: 'src/*',
                        dest: 'dist/',
                        flatten: true,
                        filter: 'isFile'
                    },
                ],
            },
        },
        uglify: {
            options: {
                mangle: false
            },
            dist: {
                files: {
                    'dist/jquery.wp-media-uploader.min.js':
                    [
                        'src/jquery.wp-media-uploader.js'
                    ]
                }
            }
        }
    });

    // ///////////////////////////////////////////////
    // Task loaders
    // //////////////////////////////////////////////
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.loadNpmTasks('grunt-contrib-copy');

    // Default task(s).
    grunt.registerTask('default', ['copy','uglify']);

};
