'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var browserSync = require('browser-sync');

var $ = require('gulp-load-plugins')();

var wiredep = require('wiredep').stream;
var _ = require('lodash');

gulp.task('styles-reload', ['styles'], function () {
  return buildStyles()
    .pipe(browserSync.stream());
});

gulp.task('styles', function () {
  return buildStyles();
});

gulp.task('stylesAuth', function () {
  return buildSingleScss(path.join(conf.paths.src, '/less/auth.scss'));
});

gulp.task('styles404', function () {
  return buildSingleScss(path.join(conf.paths.src, '/less/404.scss'));
});

var buildStyles = function () {
  var lessOptions = {
    style: 'expanded'
  };

  var injectFiles = gulp.src([
    path.join(conf.paths.src, '/assets/less/**/_*.less'),
    '!' + path.join(conf.paths.src, '/less/theme/conf/**/*.scss'),
    '!' + path.join(conf.paths.src, '/less/404.scss'),
    '!' + path.join(conf.paths.src, '/less/auth.scss')
  ], {read: false});

  var injectOptions = {
    transform: function (filePath) {
      filePath = filePath.replace(conf.paths.src + '/less/', '');
      return '@import "' + filePath + '";';
    },
    starttag: '// injector',
    endtag: '// endinjector',
    addRootSlash: false
  };

  return gulp.src([
    path.join(conf.paths.src, '/less/main.less')
  ])
    .pipe($.inject(injectFiles, injectOptions))
    .pipe(wiredep(_.extend({}, conf.wiredep)))
    .pipe($.sourcemaps.init())
    .pipe($.less(lessOptions)).on('error', conf.errorHandler('Less'))
    .pipe($.autoprefixer()).on('error', conf.errorHandler('Autoprefixer'))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve/app/')));
};

var buildSingleScss = function (paths) {

  var lessOptions = {
    style: 'expanded'
  };
  return gulp.src([paths])
    .pipe($.less(lessOptions)).on('error', conf.errorHandler('Less'))
    .pipe($.autoprefixer()).on('error', conf.errorHandler('Autoprefixer'))
    .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve/app/')));
};
