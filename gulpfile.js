'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var watchify = require('watchify');
var browserify = require('browserify');
var reactify = require('reactify');
var server = require('gulp-server-livereload');


var bundler = watchify(browserify(watchify.args));
// add the file to bundle
bundler.add('./src/betterfit.jsx');
// add any other browserify options or transforms here
bundler.transform(reactify);

gulp.task('watchify', bundle); // so you can run `gulp jdev` to build the file
bundler.on('update', bundle); // on any dep update, runs the bundler
bundler.on('log', gutil.log); // output build logs to terminal

function bundle() {
  return bundler.bundle()
    // log errors if they happen
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('bundle.js'))
    // optional, remove if you dont want sourcemaps
      .pipe(buffer())
      .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
      .pipe(sourcemaps.write('./')) // writes .map file
    //
    .pipe(gulp.dest('./dist'));
}

gulp.task('server', function() {
  gulp.src('dist')
    .pipe(server({
      livereload: true,
      directoryListing: false,
      open: true
    }));
});

gulp.task('dev', ['watchify', 'server']);
