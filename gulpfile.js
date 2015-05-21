'use strict';

var gulp = require('gulp');
var watch = require('gulp-watch');
var concat = require('gulp-concat');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var jade = require('gulp-jade');

var paths = {
    js: 'src/scripts/**/*.js',
    jade: 'src/**/*.jade',
    sass: 'src/style/**/*.sass',
    thirdPartyCssFiles: ['node_modules/normalize.css/*.css'],
    cssOutput: './dist/style/',
    htmlOutput: './dist/',
    jsOutput: './dist/scripts/'
};

gulp.task('default', ['watch']);

gulp.task('watch', ['build', 'dev-server'], function () {

    // Errors that occur while parsing jade are currently not handled and will kill the watch. :(
    // The last attempt derailed browser sync.
    gulp.src(paths.jade)
        .pipe(watch(paths.jade, {verbose: true}))
        .pipe(jade())
        .pipe(gulp.dest(paths.htmlOutput))
        .pipe(browserSync.reload({stream: true}));

    gulp.src(paths.sass)
        .pipe(watch(paths.sass, {verbose: true}))
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(gulp.dest(paths.cssOutput))
        .pipe(browserSync.reload({stream: true}));

    gulp.src(paths.js)
        .pipe(watch(paths.js, {verbose: true}))
        .pipe(gulp.dest(paths.jsOutput))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('build', function(){
  gulp.src(paths.thirdPartyCssFiles)
    .pipe(concat('third-party.css'))
    .pipe(gulp.dest(paths.cssOutput))
});

gulp.task('dev-server', function (done) {
    browserSync({

        open: false,
        port: 9000,
        server: {
            baseDir: ['./dist/'],
            middleware: function (req, res, next) {
                res.setHeader('Access-Control-Allow-Origin', '*');
                next();
            }
        }
    }, done);
});
