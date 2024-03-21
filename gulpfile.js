'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass')(require('sass'));
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

// compile scss to css
gulp.task('sass', function () {
    return gulp.src('./sass/styles.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({basename: 'styles.min'}))
        .pipe(gulp.dest('./dist/css')); // Output to dist/css directory
});

// minify js
gulp.task('minify-js', function () {
    return gulp.src('./js/scripts.js')
        .pipe(uglify())
        .pipe(rename({basename: 'scripts.min'}))
        .pipe(gulp.dest('./dist/js')); // Output to dist/js directory
});

// Build task
gulp.task('build', gulp.series('sass', 'minify-js'));

// Watch task
gulp.task('watch', function () {
    gulp.watch('./sass/**/*.scss', gulp.series('sass'));
    gulp.watch('./js/*.js', gulp.series('minify-js'));
});

// Default task
gulp.task('default', gulp.series('build', 'watch'));
