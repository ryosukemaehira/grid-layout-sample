var gulp = require('gulp');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify')
var pug = require('gulp-pug');
var scss = require('gulp-Scss');
var runSequence = require('gulp-run-sequence');
var webserver = require('gulp-webserver');

gulp.task('compile-pug', function buildHTML() {
  return gulp.src('./src/templete/*.pug')
  .pipe(plumber({
    errorHandler: notify.onError('<%= error.message %>')
  }))
  .pipe(pug())
  .pipe(gulp.dest('./dist/'))
});

gulp.task('compile-scss', function () {
  return gulp.src('./src/scss/style.scss')
  .pipe(plumber({
    errorHandler: notify.onError('<%= error.message %>')
  }))
  .pipe(scss())
  .pipe(gulp.dest('./dist/css/'))
})

gulp.task('compile', ['compile-scss', 'compile-pug']);

gulp.task(
  'watch',
  function() {
    gulp.watch('src/**/*', ['compile']);
  }
  );

gulp.task(
  'webserver',
  function() {
    return gulp.src('./dist')
    .pipe(webserver({
      open: true
    }));
  }
  );

gulp.task('development', function(callback) {
  runSequence('compile', 'watch', 'webserver', callback);
});
