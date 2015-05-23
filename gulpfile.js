'use strict';

var gulp = require('gulp');
var watch = require('gulp-watch');
var concat = require('gulp-concat');
var minifyCss = require('gulp-minify-css');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var jade = require('gulp-jade');

var watchOptions = {
  verbose: true
};

var minifyCssOptions = {
  compatibility: 'ie9'
};

var browserSyncOptions = {
  stream: true
}

var paths = {
  js: 'src/scripts/**/*.js',
  jade: 'src/**/*.jade',
  sass: 'src/style/**/*.sass',
  thirdPartyCssFiles: ['node_modules/normalize.css/normalize.css'],
  cssOutput: './dist/style/',
  htmlOutput: './dist/',
  jsOutput: './dist/scripts/'
};

gulp.task('default', ['watch']);

gulp.task('watch', ['build', 'dev-server'], function () {

  gulp.src(paths.jade)
    .pipe(watch(paths.jade, watchOptions))
    .pipe(jade())
    .pipe(gulp.dest(paths.htmlOutput))
    .pipe(browserSync.reload(browserSyncOptions));

  gulp.src(paths.sass)
    .pipe(watch(paths.sass, watchOptions))
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(minifyCss(minifyCssOptions))
    .pipe(gulp.dest(paths.cssOutput))
    .pipe(browserSync.reload(browserSyncOptions));

  gulp.src(paths.js)
    .pipe(watch(paths.js, watchOptions))
    .pipe(gulp.dest(paths.jsOutput))
    .pipe(browserSync.reload(browserSyncOptions));
});

gulp.task('build', function () {

  gulp.src(paths.thirdPartyCssFiles)
    .pipe(concat('third-party.css'))
    .pipe(minifyCss(minifyCssOptions))
    .pipe(gulp.dest(paths.cssOutput));

  gulp.src(paths.sass)
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(minifyCss(minifyCssOptions))
    .pipe(gulp.dest(paths.cssOutput));

  gulp.src(paths.jade)
    .pipe(jade())
    .pipe(gulp.dest(paths.htmlOutput));

  gulp.src(paths.js)
    .pipe(gulp.dest(paths.jsOutput));
});

gulp.task('dev-server', function (done) {
  browserSync({
    open: false,
    port: 9000,
    notify: {
      styles: ['opacity: 0', 'position: absolute'] // Hide notifications
    },
    server: {
      baseDir: ['./dist/'],
      middleware: function (req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
      }
    }
  }, done);
});
