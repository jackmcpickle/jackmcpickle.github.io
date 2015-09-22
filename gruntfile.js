module.exports = function(grunt) {

  // Require needed grunt-modules
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-livereload');


  grunt.initConfig({

    sass: {
      dist: {
        files: {
          'assets/css/app.css': 'assets/sass/app.scss'
        },
        options: {
          style: 'expanded',
          quiet: true
        }
      }
    },

    coffee: {
      compile: {
        options: {
          sourceMap: true
        },
        files: {
          'assets/js/main.js': 'assets/coffee/main.coffee' // 1:1 compile
        }
      }
    },

    watch: {
      sass: {
        files: ['assets/sass/*.sass', 'assets/sass/*.scss'],
        tasks: ['sass']
      },

      scripts: {
        files: ['assets/coffee/*.coffee'],
        tasks: ['coffee:compile']
      },

      livereload: {
        files: ['assets/css/*.css', 'assets/js/*.js', 'templates/**/*.html'],
        options: {
          livereload: true
        }
      },
    },

    uglify: {
      options: {
        sourceMapIn: 'assets/js/main.js.map',
        sourceMap: 'assets/js/app.min.js.map',
      },
      my_target: {
        files: {
          'assets/js/app.min.js': ['assets/js/main.js', 'assets/js/libs/*.js']
        }
      }
    }

  });

  grunt.registerTask('live', 'watch');
  grunt.registerTask('build', ['coffee:compile', 'sass', 'uglify']);


};
