// grab our packages
var gulp   = require('gulp'),
    concat = require('gulp-concat'),
    plumber = require('gulp-plumber');

// define the default task and add the watch task to it
gulp.task('default', ['js', 'watch']);

// configure the jshint task
gulp.task('js', function() {
  return gulp.src('js/*.js')
    .pipe(plumber())
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest('./'));
});

// configure which files to watch and what tasks to use on file changes
gulp.task('watch', function() {
  gulp.watch('js/*.js', ['js']);
});
