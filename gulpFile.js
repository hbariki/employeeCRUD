'use strict';

var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var concat = require('gulp-concat');

gulp.task('start', function () {
    nodemon({
        script: 'server.js'
        , ext: 'js html'
        , env: { 'NODE_ENV': 'development' }
    })
});

gulp.task('js', function(){
    return gulp.src(['./client/js/*.js', './client/js/controllers/*.js'])
        .pipe(concat('client-bundle.js'))
        .pipe(gulp.dest('./client/dist/js'));
});

gulp.task('css', function(){
    return gulp.src(['./client/css/*.css'])
        .pipe(concat('client-bundle.css'))
        .pipe(gulp.dest('./client/dist/css'));
});

gulp.task('watch', function() {
   gulp.watch('./client/**/*.js', ['js']);
    gulp.watch('./client/**/*.css', ['css']);
});

gulp.task('default', ['start', 'js', 'css', 'watch']);