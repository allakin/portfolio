'use strict';

var gulp = require('gulp');
var fs = require('fs');
var sass = require('gulp-sass');
var jade = require('gulp-jade');
var browserSync = require('browser-sync').create();

gulp.task('sass', function () {
  return gulp.src('./assets/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./app/css'))
    .pipe(browserSync.stream());
});

gulp.task('jade', function() {
  var data = JSON.parse(fs.readFileSync('./assets/data/data.json', 'utf-8'));

  return gulp.src('./assets/jade/!(_)*.jade')
  .pipe(jade({
      locals: data
  }))
  .pipe(gulp.dest('./app/'))
  .on('end', browserSync.reload)
});

gulp.task('serve', ['sass', 'jade'], function() {

    browserSync.init({
        server: "./app"
    });

    gulp.watch('./assets/sass/**/*.scss', ['sass']);
    gulp.watch('./assets/jade/**/*.jade', ['jade']);
    gulp.watch('./assets/data/data.json', ['jade']);
});

gulp.task('default', ['serve']);
