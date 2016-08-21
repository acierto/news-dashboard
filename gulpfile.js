// Gulpfile
const fs = require('fs');
var path = require('path');
var gulp = require('gulp');
var gutil = require('gulp-util');
var eslint = require('gulp-eslint');
var connect = require('gulp-connect');
var shell = require('gulp-shell');
var webpack = require('webpack');
var vinylPaths = require('vinyl-paths');
var browserSync = require('browser-sync');

// Webpack configs
var buildCfg = require('./webpack.config');

var src = './client/';
var dest = './build/';

// ----------------------------------------------------------------------------
// Constants
// ----------------------------------------------------------------------------
var FRONTEND_FILES = [
    src + 'js/**/*.{js,jsx}'
];

var BACKEND_FILES = [
    '*.js'
];

gulp.task('eslint-frontend', function () {
    return gulp
        .src(FRONTEND_FILES)
        .pipe(eslint({
            configFile: './.eslintrc',
            envs: [
                'browser'
            ]
        }))
        .pipe(eslint.formatEach('stylish', process.stderr))
        .pipe(eslint.failOnError());
});

gulp.task('eslint-backend', function () {
    return gulp
        .src(BACKEND_FILES)
        .pipe(eslint({
            configFile: './.eslintrc',
            envs: [
                'node'
            ]
        }))
        .pipe(eslint.formatEach('stylish', process.stderr))
        .pipe(eslint.failOnError());
});

gulp.task('eslint', ['eslint-frontend', 'eslint-backend']);

gulp.task('clean', function () {
    return gulp
        .src(dest, {read: false})
        .pipe(vinylPaths(del));
});

gulp.task('webpack', function (done) {
    /* eslint-disable */
    webpack(buildCfg).run(function (err) {
        if (err) {
            throw new gutil.PluginError('webpack', err);
        }
        gutil.log('[webpack]', 'bundling');
        done();
    });
});
/* eslint-enable */


gulp.task('browser-sync', function () {
    browserSync({
        ui: {
            port: 3003
        },
        files: [path.join(dest, '**', '*')],
        port: 3002,
        proxy: 'http://localhost:3000',
        open: false
    });
});

// ----------------------------------------------------------------------------
// Production
// ----------------------------------------------------------------------------
gulp.task('build:prod', function (done) {
    webpack(buildCfg).run(function (err, stats) {
        if (err) {
            throw new gutil.PluginError('webpack', err);
        }

        gutil.log('[webpack]', stats.toString({
            hash: true,
            colors: true,
            cached: false
        }));

        done();
    });
});

gulp.task('build:prod-full', ['clean'], function () {
    return gulp.run('build:prod');
});

// ----------------------------------------------------------------------------
// Servers
// ----------------------------------------------------------------------------
gulp.task('server', shell.task(['npm run start']));

// Source maps server
gulp.task('server:sources', function () {
    connect.server({
        root: __dirname,
        port: 3001
    });
});

// ----------------------------------------------------------------------------
// Aggregations
// ----------------------------------------------------------------------------
gulp.task('serve', ['server']);
gulp.task('ls', ['build:ls', 'server:sources']);
gulp.task('dev', ['webpack', 'server', 'server:sources', 'browser-sync']);
gulp.task('prod', ['build:prod', 'server', 'server:sources']);
gulp.task('build', ['build:prod-full']);
gulp.task('default', ['eslint', 'dev']);