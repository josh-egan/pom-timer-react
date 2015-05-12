'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var jade = require('gulp-jade');

var paths = {
    js: 'src/js/**/*.js',
    jade: 'src/**/*.jade',
    sass: 'src/style/**/*.sass',
    cssOutput: './dist/style/',
    htmlOutput: './dist/'
};

gulp.task('default', ['watch']);

gulp.task('build', ['compile-sass', 'compile-jade']);

gulp.task('watch', ['build', 'dev-server'], function () {
    gulp.watch(paths.js, [browserSync.reload]).on('change', reportChange);
    gulp.watch(paths.jade, ['compile-jade', browserSync.reload]).on('change', reportChange);
    gulp.watch(paths.sass, ['compile-sass', browserSync.reload]).on('change', reportChange);
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

gulp.task('compile-jade', function () {
    var data = {};

    gulp.src(paths.jade)
        .pipe(jade({
            locals: data
        }))
        .pipe(gulp.dest(paths.htmlOutput))
});

gulp.task('compile-sass', function () {
    gulp.src(paths.sass)
        .pipe(sass({
            style: 'compressed',
            errLogToConsole: false,
            onError: function (err) {
                return console.log(err);
            }
        }))
        .pipe(gulp.dest(paths.cssOutput));
})

function reportChange(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
}

