/******************************************************
 * PATTERN LAB NODE
 * EDITION-NODE-GRUNT
 * The grunt wrapper around patternlab-node core, providing tasks to interact with the core library and move supporting frontend assets.
******************************************************/

module.exports = function (grunt) {
  var patternLab = require('patternlab-node');
  var default_pl_config = require('../default-config.json');

  var path = require('path'),
      argv = require('minimist')(process.argv.slice(2));

  // load all grunt tasks
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browser-sync');

  grunt.registerTask('patternlab', 'create design systems with atomic design', function (arg) {
    /******************************************************
     * PATTERN LAB CONFIGURATION
    ******************************************************/
    var config;

    // Use specified config or else use default
    var options = this.options(default_pl_config);

    if (options.config_file) {
      // If seperate config file was specified
      config = grunt.file.readJSON(options.config_file);
    } else {
      // Else use specified/default config
      config = options;
    }

    var pl = patternLab(config);
    if (arguments.length === 0) {
      pl.build(function(){}, config.cleanPublic);

      // Move other files
      grunt.task.run(['copy:main']);
    }

    var patternlab_targets = {
      "set-up": function () {
        grunt.task.run(['copy:set-up']);
      },
      "version": function () {
        pl.version();
      },
      "patternsonly": function () {
        pl.patternsonly(function(){},config.cleanPublic);
      },
      "help": function () {
        pl.help();
      },
      "starterkit-list": function () {
        pl.liststarterkits();
      },
      "starterkit-load": function () {
        pl.loadstarterkit(argv.kit);
      }
    };

    if (arg) {
      if (patternlab_targets[arg]) {
        patternlab_targets[arg]();
      } else {
        pl.help();
      }
    }

    /******************************************************
     * COPY TASKS
    ******************************************************/

    // relative path to main gruntfile dir
    var rel_path = path.relative(process.cwd(), __dirname);

    grunt.config('copy', {
      main: {
        files: [
          { expand: true, cwd: path.resolve(config.paths.source.js), src: '**/*.js', dest: path.resolve(config.paths.public.js) },
          { expand: true, cwd: path.resolve(config.paths.source.css), src: '*.css', dest: path.resolve(config.paths.public.css) },
          { expand: true, cwd: path.resolve(config.paths.source.images), src: '*', dest: path.resolve(config.paths.public.images) },
          { expand: true, cwd: path.resolve(config.paths.source.fonts), src: '*', dest: path.resolve(config.paths.public.fonts) },
          { expand: true, cwd: path.resolve(config.paths.source.root), src: 'favicon.ico', dest: path.resolve(config.paths.public.root) },
          { expand: true, cwd: path.resolve(config.paths.source.styleguide), src: ['*', '**'], dest: path.resolve(config.paths.public.root) },
          // slightly inefficient to do this again - I am not a grunt glob master. someone fix
          { expand: true, flatten: true, cwd: path.resolve(config.paths.source.styleguide, 'styleguide', 'css', 'custom'), src: '*.css)', dest: path.resolve(config.paths.public.styleguide, 'css') }
        ]
      },
      "set-up": {
        files: [{
          expand: true,
          cwd: rel_path + '/../source/',
          src: '**',
          dest: 'source/'
        }]
      }
    });

    console.log(grunt.config("copy.set-up"));

    /******************************************************
     * SERVER AND WATCH TASKS
    ******************************************************/
    grunt.config('watch', {
      all: {
        files: [
          path.resolve(config.paths.source.css + '**/*.css'),
          path.resolve(config.paths.source.styleguide + 'css/*.css'),
          path.resolve(config.paths.source.patterns + '**/*'),
          path.resolve(config.paths.source.fonts + '/*'),
          path.resolve(config.paths.source.images + '/*'),
          path.resolve(config.paths.source.data + '*.json'),
          path.resolve(config.paths.source.js + '/*.js'),
          path.resolve(config.paths.source.root + '/*.ico')
        ],
        tasks: ['default', 'bsReload:css']
      }
    });

    grunt.config('browserSync', {
      dev: {
        options: {
          server:  path.resolve(config.paths.public.root),
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
                files: [path.resolve(config.paths.public.root + '/index.html'), path.resolve(config.paths.public.styleguide + '/styleguide.html')]
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
    });

    grunt.config('bsReload', {
      css: path.resolve(config.paths.public.root + '**/*.css')
    });
  });

  /******************************************************
   * COMPOUND TASKS
  ******************************************************/

  grunt.registerTask('patternlab:watch', ['patternlab', 'watch:all']);
  grunt.registerTask('patternlab:serve', ['patternlab', 'browserSync', 'watch:all']);

};
