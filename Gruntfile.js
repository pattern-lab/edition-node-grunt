module.exports = function (grunt) {

  var path = require('path');

  function paths() {
    return require('./patternlab-config.json').paths;
  }

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    copy: {
      main: {
        files: [
          { expand: true, cwd: path.resolve(paths().source.js), src: '*.js', dest: path.resolve(paths().public.js) },
          { expand: true, cwd: path.resolve(paths().source.css), src: '*.css', dest: path.resolve(paths().public.css) },
          { expand: true, cwd: path.resolve(paths().source.images), src: ['**/*.png', '**/*.jpg', '**/*.gif', '**/*.jpeg'], dest: path.resolve(paths().public.images) },
          { expand: true, cwd: path.resolve(paths().source.fonts), src: '*', dest: path.resolve(paths().public.fonts) },
          { expand: true, cwd: path.resolve(paths().source.data), src: 'annotations.js', dest: path.resolve(paths().public.data) },
          { expand: true, cwd: path.resolve(paths().source.root), src: 'favicon.ico', dest: path.resolve(paths().public.root) }
        ]
      },
      styleguide: {
        files: [
          { expand: true, cwd: path.resolve(paths().source.styleguide), src: ['*.*', '**/*.*'], dest: path.resolve(paths().public.styleguide) }
        ]
      }
    },
    watch: {
      all: {
        files: [
          path.resolve(paths().source.css + '**/*.css'),
          path.resolve(paths().source.styleguide + 'css/*.css'),
          path.resolve(paths().source.patterns + '**/*'),
          path.resolve(paths().source.fonts + '/*'),
          path.resolve(paths().source.images + '/*'),
          path.resolve(paths().source.data + '*.json'),
          path.resolve(paths().source.js + '/*.js'),
          path.resolve(paths().source.root + '/*.ico')
        ],
        tasks: ['default', 'bsReload:css']
      }
    },
    browserSync: {
      dev: {
        options: {
          server:  path.resolve(paths().public.root),
          watchTask: true,
          watchOptions: {
            ignoreInitial: true,
            ignored: '*.html'
          },
          snippetOptions: {
            // Ignore all HTML files within the templates folder
            blacklist: ['/index.html', '/', '/?*']
          },
          plugins: [
            {
              module: 'bs-html-injector',
              options: {
                files: [path.resolve(paths().public.root + '/index.html'), path.resolve(paths().public.styleguide + '/styleguide.html')]
              }
            }
          ],
          notify: {
            styles: [
              'display: none',
              'padding: 15px',
              'font-family: sans-serif',
              'position: fixed',
              'font-size: 1em',
              'z-index: 9999',
              'bottom: 0px',
              'right: 0px',
              'border-top-left-radius: 5px',
              'background-color: #1B2032',
              'opacity: 0.4',
              'margin: 0',
              'color: white',
              'text-align: center'
            ]
          }
        }
      }
    },
    bsReload: {
      css: path.resolve(paths().public.root + '**/*.css')
    }
  });

  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  //load the patternlab task
  require('./core/lib/patternlab_grunt')(grunt);

  grunt.registerTask('default', ['patternlab', 'copy:main', 'copy:styleguide']);

  grunt.registerTask('serve', ['patternlab', 'copy:main', 'copy:styleguide', 'browserSync', 'watch:all']);

};
