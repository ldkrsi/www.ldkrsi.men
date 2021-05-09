'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
sass.compiler = require('sass');
const babel = require('gulp-babel');
const terser = require('gulp-terser');
const postcss = require('gulp-postcss');
const rev = require('gulp-rev');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const del = require('del');
const replace = require('gulp-replace');
const through2 = require('through2');
const path = require('path');
const Vinyl = require('vinyl');
const htmlBuilder = require('./build.js');


gulp.task('sass', () => {
    return gulp.src('./assets/scss/*.scss')
        .pipe(sass())
        .pipe(postcss([autoprefixer(), cssnano({ preset: 'default' })]))
        .pipe(replace('@charset "UTF-8";', ''))
        .pipe(gulp.dest('./views/css'));
});

gulp.task('html', () => {
    return htmlBuilder().pipe(gulp.dest('./public'));
});

gulp.task('copy:css', () => {
    return gulp.src('./node_modules/highlight.js/styles/default.css')
        .pipe(gulp.dest('./views/css/highlight.js/'));
});

gulp.task('clean', () => {
    return del(['public', 'tmp', 'views/css']);
});

gulp.task('build', gulp.series(
    'clean',
    gulp.parallel('sass', 'copy:css'),
	'html'
));