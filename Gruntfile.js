/* jshint node: true */
'use strict';

module.exports = function (grunt) {

  grunt.loadNpmTasks('grunt-merge-json');
  grunt.loadNpmTasks('grunt-ts');

  var localConfig;
  try {
    localConfig = require('./server/config/local.env');
  } catch(e) {
    localConfig = {};
  }

  // Load grunt tasks automatically, when needed
  require('jit-grunt')(grunt, {
    express: 'grunt-express-server',
    useminPrepare: 'grunt-usemin',
    ngtemplates: 'grunt-angular-templates',
    cdnify: 'grunt-google-cdn',
    protractor: 'grunt-protractor-runner',
    buildcontrol: 'grunt-build-control',
    istanbul_check_coverage: 'grunt-mocha-istanbul',
    ngconstant: 'grunt-ng-constant'
  });

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    pkg: grunt.file.readJSON('package.json'),
    supedidos: {
      // configurable paths
      client: require('./bower.json').appPath || 'client',
      server: 'server',
      dist: 'dist'
    },
    express: {
      options: {
        port: process.env.PORT || 9000
      },
      dev: {
        options: {
          script: '<%= supedidos.server %>',
          debug: true
        }
      },
      prod: {
        options: {
          script: '<%= supedidos.dist %>/<%= supedidos.server %>'
        }
      }
    },
    open: {
      server: {
        url: 'http://localhost:<%= express.options.port %>'
      }
    },
    watch: {
      babel: {
        files: ['<%= supedidos.client %>/{app,components}/**/!(*.spec|*.mock).js'],
        tasks: ['newer:babel:client']
      },
      ts: {
        files: ['<%= supedidos.client %>/{app,components}/**/!(*.spec|*.mock).ts'],
        tasks: ['ts:client']
      },
      ngconstant: {
        files: ['config.env.json'],
        tasks: ['ngconstant']
      },
      'merge-json': {
        files: ['<%= supedidos.client %>/lang/**/*.json'],
        tasks: ['merge-json']
      },
      injectJS: {
        files: [
          '<%= supedidos.client %>/{app,components}/**/!(*.spec|*.mock).js',
          '!<%= supedidos.client %>/app/app.js'
        ],
        tasks: ['injector:scripts']
      },
      injectCss: {
        files: ['<%= supedidos.client %>/{app,components}/**/*.css'],
        tasks: ['injector:css']
      },
      mochaTest: {
        files: ['<%= supedidos.server %>/**/*.{spec,integration}.js'],
        tasks: ['env:test', 'mochaTest']
      },
      jsTest: {
        files: ['<%= supedidos.client %>/{app,components}/**/*.{spec,mock}.js'],
        tasks: ['newer:jshint:all', 'wiredep:test', 'karma']
      },
      injectLess: {
        files: ['<%= supedidos.client %>/{app,components}/**/*.less'],
        tasks: ['injector:less']
      },
      less: {
        files: ['<%= supedidos.client %>/{app,components}/**/*.less'],
        tasks: ['less', 'postcss']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      express: {
        files: ['<%= supedidos.server %>/**/*.{js,json}'],
        tasks: ['express:dev'],
        options: {
          spawn: false //Without this option specified express won't be reloaded
        }
      },
      bower: {
        files: ['bower.json'],
        tasks: ['wiredep']
      },
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '<%= supedidos.client %>/.jshintrc',
        reporter: require('jshint-stylish')
      },
      server: {
        options: {
          jshintrc: '<%= supedidos.server %>/.jshintrc'
        },
        src: ['<%= supedidos.server %>/**/!(*.spec|*.integration).js']
      },
      serverTest: {
        options: {
          jshintrc: '<%= supedidos.server %>/.jshintrc-spec'
        },
        src: ['<%= supedidos.server %>/**/*.{spec,integration}.js']
      },
      all: ['<%= supedidos.client %>/{app,components}/**/!(*.spec|*.mock).js'],
      test: {
        src: ['<%= supedidos.client %>/{app,components}/**/*.{spec,mock}.js']
      }
    },

    jscs: {
      options: {
        config: ".jscsrc"
      },
      main: {
        files: {
          src: [
            '<%= supedidos.client %>/app/**/*.js',
            '<%= supedidos.server %>/**/*.js'
          ]
        }
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= supedidos.dist %>/!(.git*|.openshift|Procfile)**'
          ]
        }]
      },
      server: '.tmp'
    },

    // Add vendor prefixed styles
    postcss: {
      options: {
        map: true,
        processors: [
          require('autoprefixer')({browsers: ['last 2 version']})
        ]
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/',
          src: '{,*/}*.css',
          dest: '.tmp/'
        }]
      }
    },

    // Debugging with node inspector
    'node-inspector': {
      custom: {
        options: {
          'web-host': 'localhost'
        }
      }
    },

    // Use nodemon to run server in debug mode with an initial breakpoint
    nodemon: {
      debug: {
        script: '<%= supedidos.server %>',
        options: {
          nodeArgs: ['--debug-brk'],
          env: {
            PORT: process.env.PORT || 9000
          },
          callback: function (nodemon) {
            nodemon.on('log', function (event) {
              console.log(event.colour);
            });

            // opens browser on initial server start
            nodemon.on('config:update', function () {
              setTimeout(function () {
                require('open')('http://localhost:8080/debug?port=5858');
              }, 500);
            });
          }
        }
      }
    },

    // Automatically inject Bower components into the app and karma.conf.js
    wiredep: {
      options: {
        exclude: [
          '/json3/',
          '/es5-shim/',
          /font-awesome\.css/
        ]
      },
      client: {
        src: '<%= supedidos.client %>/index.html',
        ignorePath: '<%= supedidos.client %>/',
      },
      test: {
        src: './karma.conf.js',
        devDependencies: true
      }
    },

    // Renames files for browser caching purposes
    filerev: {
      dist: {
        src: [
          '<%= supedidos.dist %>/<%= supedidos.client %>/!(bower_components){,*/}*.{js,css}',
          '<%= supedidos.dist %>/<%= supedidos.client %>/assets/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
          '<%= supedidos.dist %>/<%= supedidos.client %>/assets/fonts/*'
        ]
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      html: ['<%= supedidos.client %>/index.html'],
      options: {
        dest: '<%= supedidos.dist %>/<%= supedidos.client %>'
      }
    },

    // Performs rewrites based on rev and the useminPrepare configuration
    usemin: {
      html: ['<%= supedidos.dist %>/<%= supedidos.client %>/{,!(bower_components)/**/}*.html'],
      css: ['<%= supedidos.dist %>/<%= supedidos.client %>/!(bower_components){,*/}*.css'],
      js: ['<%= supedidos.dist %>/<%= supedidos.client %>/!(bower_components){,*/}*.js'],
      options: {
        assetsDirs: [
          '<%= supedidos.dist %>/<%= supedidos.client %>',
          '<%= supedidos.dist %>/<%= supedidos.client %>/assets/images'
        ],
        // This is so we update image references in our ng-templates
        patterns: {
          js: [
            [/(assets\/images\/.*?\.(?:gif|jpeg|jpg|png|webp|svg))/gm, 'Update the JS to reference our revved images']
          ]
        }
      }
    },

    // The following *-min tasks produce minified files in the dist folder
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= supedidos.client %>/assets/images',
          src: '{,*/}*.{png,jpg,jpeg,gif,svg}',
          dest: '<%= supedidos.dist %>/<%= supedidos.client %>/assets/images'
        }]
      }
    },

    // Allow the use of non-minsafe AngularJS files. Automatically makes it
    // minsafe compatible so Uglify does not destroy the ng references
    ngAnnotate: {
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/concat',
          src: '**/*.js',
          dest: '.tmp/concat'
        }]
      }
    },

    // Dynamically generate angular constant `envConfig` from
    // `server/config/environment/shared.js`
    ngconstant: {
      options: {
        name: 'supedidos',
        dest: '<%= supedidos.client %>/app/config/env.ts',
        deps: false,
        wrap: false,
        configPath: 'config.env',
        template: grunt.file.read('custom-constant.tpl.ejs')
      },
      app: {
        constants: function() {
          return {
            envConfig: grunt.file.readJSON('config.env.json')
          };
        }
      }
    },

    'merge-json': {
        i18n: {
            files: {
                '.tmp/lang/es-ar.json': [ '<%= supedidos.client %>/lang/es-ar/*.json' ]
            }
        }
    },

    // Package all the html partials into a single javascript payload
    ngtemplates: {
      options: {
        // This should be the name of your apps angular module
        module: 'supedidos.templates',
        htmlmin: {
          collapseBooleanAttributes: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true,
          removeEmptyAttributes: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true
        },
        usemin: 'app/app.js'
      },
      main: {
        cwd: '<%= supedidos.client %>',
        src: ['{app,components}/**/*.html'],
        dest: '.tmp/templates.js'
      },
      tmp: {
        cwd: '.tmp',
        src: ['{app,components}/**/*.html'],
        dest: '.tmp/tmp-templates.js'
      }
    },

    // Replace Google CDN references
    cdnify: {
      dist: {
        html: ['<%= supedidos.dist %>/<%= supedidos.client %>/*.html']
      }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= supedidos.client %>',
          dest: '<%= supedidos.dist %>/<%= supedidos.client %>',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            'bower_components/**/*',
            'assets/images/{,*/}*.{webp}',
            'assets/fonts/**/*',
            'index.html'
          ]
        }, {
          expand: true,
          cwd: '.tmp/images',
          dest: '<%= supedidos.dist %>/<%= supedidos.client %>/assets/images',
          src: ['generated/*']
        }, {
          expand: true,
          dest: '<%= supedidos.dist %>',
          src: [
            'package.json',
            '<%= supedidos.server %>/**/*'
          ]
          }, {
            expand: true,
            cwd: '.tmp/lang',
            dest: '<%= supedidos.dist %>/<%= supedidos.client %>/lang',
            src: ['**/*.json']
          }]
      },
      styles: {
        expand: true,
        cwd: '<%= supedidos.client %>',
        dest: '.tmp/',
        src: ['{app,components}/**/*.css']
      }
    },

    buildcontrol: {
      options: {
        dir: '<%= supedidos.dist %>',
        commit: true,
        push: true,
        connectCommits: false,
        message: 'Built %sourceName% from commit %sourceCommit% on branch %sourceBranch%'
      },
      heroku: {
        options: {
          remote: 'heroku',
          branch: 'master'
        }
      },
      openshift: {
        options: {
          remote: 'openshift',
          branch: 'master'
        }
      }
    },

    // Run some tasks in parallel to speed up the build process
    concurrent: {
      pre: [
        'injector:less',
        'ngconstant'
      ],
      server: [
        'newer:babel:client',
        'less',
      ],
      test: [
        'newer:babel:client',
        'less',
      ],
      debug: {
        tasks: [
          'nodemon',
          'node-inspector'
        ],
        options: {
          logConcurrentOutput: true
        }
      },
      dist: [
        'newer:babel:client',
        'less',
        'imagemin'
      ]
    },

    // Test settings
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true
      }
    },

    mochaTest: {
      options: {
        reporter: 'spec',
        require: 'mocha.conf.js',
        timeout: 5000 // set default mocha spec timeout
      },
      unit: {
        src: ['<%= supedidos.server %>/**/*.spec.js']
      },
      integration: {
        src: ['<%= supedidos.server %>/**/*.integration.js']
      }
    },

    mocha_istanbul: {
      unit: {
        options: {
          excludes: ['**/*.{spec,mock,integration}.js'],
          reporter: 'spec',
          require: ['mocha.conf.js'],
          mask: '**/*.spec.js',
          coverageFolder: 'coverage/server/unit'
        },
        src: '<%= supedidos.server %>'
      },
      integration: {
        options: {
          excludes: ['**/*.{spec,mock,integration}.js'],
          reporter: 'spec',
          require: ['mocha.conf.js'],
          mask: '**/*.integration.js',
          coverageFolder: 'coverage/server/integration'
        },
        src: '<%= supedidos.server %>'
      }
    },

    istanbul_check_coverage: {
      default: {
        options: {
          coverageFolder: 'coverage/**',
          check: {
            lines: 80,
            statements: 80,
            branches: 80,
            functions: 80
          }
        }
      }
    },

    protractor: {
      options: {
        configFile: 'protractor.conf.js'
      },
      chrome: {
        options: {
          args: {
            browser: 'chrome'
          }
        }
      }
    },

    env: {
      test: {
        NODE_ENV: 'test'
      },
      prod: {
        NODE_ENV: 'production'
      },
      all: localConfig
    },

    // Compiles ES6 to JavaScript using Babel
    babel: {
      options: {
        sourceMap: true,
        optional: [
          'es7.classProperties'
        ]
      },
      client: {
        files: [{
          expand: true,
          cwd: '<%= supedidos.client %>',
          src: ['{app,components}/**/!(*.spec).js'],
          dest: '.tmp'
        }]
      },
      server: {
        options: {
          optional: ['runtime']
        },
        files: [{
          expand: true,
          cwd: '<%= supedidos.server %>',
          src: ['**/*.{js,json}'],
          dest: '<%= supedidos.dist %>/<%= supedidos.server %>'
        }]
      }
    },

    ts: {
        client : {
            tsconfig: true,
            src: ['typings/tsd.d.ts', 'app/**/!(*.spec|*.mock).ts'],
            outDir: '.tmp',
            options: {
                fast: 'never',
                rootDir: '<%= supedidos.client %>'
            }
        }
    },

    // Compiles Less to CSS
    less: {
      server: {
        files: {
          '.tmp/app/app.css' : '<%= supedidos.client %>/app/app.less'
        }
      }
    },

    injector: {
      options: {

      },
      // Inject application script files into index.html (doesn't include bower)
      scripts: {
        options: {
          transform: function(filePath) {
            var yoClient = grunt.config.get('supedidos.client');
            filePath = filePath.replace('/' + yoClient + '/', '');
            filePath = filePath.replace('/.tmp/', '');
            return '<script src="' + filePath + '"></script>';
          },
          sort: function(a, b) {
            var module = /\.module\.js$/;
            var aMod = module.test(a);
            var bMod = module.test(b);
            // inject *.module.js first
            return (aMod === bMod) ? 0 : (aMod ? -1 : 1);
          },
          starttag: '<!-- injector:js -->',
          endtag: '<!-- endinjector -->'
        },
        files: {
          '<%= supedidos.client %>/index.html': [
               [
                 '.tmp/{app,components}/**/!(*.spec|*.mock).js',
                 '!{.tmp,<%= supedidos.client %>}/app/app.js'
               ]
            ]
        }
      },

      // Inject component less into app.less
      less: {
        options: {
          transform: function(filePath) {
            var yoClient = grunt.config.get('supedidos.client');
            filePath = filePath.replace('/' + yoClient + '/app/', '');
            filePath = filePath.replace('/' + yoClient + '/components/', '../components/');
            return '@import \'' + filePath + '\';';
          },
          starttag: '// injector',
          endtag: '// endinjector'
        },
        files: {
          '<%= supedidos.client %>/app/app.less': [
            '<%= supedidos.client %>/{app,components}/**/*.less',
            '!<%= supedidos.client %>/app/app.less'
          ]
        }
      },

      // Inject component css into index.html
      css: {
        options: {
          transform: function(filePath) {
            var yoClient = grunt.config.get('supedidos.client');
            filePath = filePath.replace('/' + yoClient + '/', '');
            filePath = filePath.replace('/.tmp/', '');
            return '<link rel="stylesheet" href="' + filePath + '">';
          },
          starttag: '<!-- injector:css -->',
          endtag: '<!-- endinjector -->'
        },
        files: {
          '<%= supedidos.client %>/index.html': [
            '<%= supedidos.client %>/{app,components}/**/*.css'
          ]
        }
      }
    },
  });

  grunt.registerTask('keepalive', 'Keep grunt running', function() {
    this.async();
  });

  grunt.registerTask('serve', [
    'clean:server',
    'env:all',
    'concurrent:pre',
    'concurrent:server',
    'ts:client',
    'injector',
    'merge-json',
    'wiredep:client',
    'postcss',
    'express:dev',
    'open',
    'watch',
    'keepalive'
  ]);

  grunt.registerTask('build', [
      'clean:dist',
      'injector:less',
      'concurrent:dist',
      'injector',
      'merge-json',
      'wiredep:client',
      'useminPrepare',
      'postcss',
      'ngtemplates',
      'concat',
      'ngAnnotate',
      'copy:dist',
      'babel:server',
      'cdnify',
      'cssmin',
      'uglify',
      'filerev',
      'usemin',
      'env:all',
      'env:prod',
      'express:prod',
      'open',
      'keepalive'
  ]);

};
