'use strict';

import gulp from 'gulp';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import { deleteAsync as del } from 'del'
import replace from 'gulp-replace';
import htmlBuilder from './build.js';

const sass = gulpSass(dartSass);

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

gulp.task('copy:image', () => {
    return gulp.src('./assets/images/*')
        .pipe(gulp.dest('./public/assets/images'))
});

gulp.task('copy:static', () => {
    return gulp.src('./static/**/*')
        .pipe(gulp.dest('./public/'))
});

gulp.task('clean', () => {
    return del(['public', 'tmp', 'views/css']);
});

gulp.task('build', gulp.series(
    'clean',
    gulp.parallel('sass', 'copy:css', 'copy:image', 'copy:static'),
    'html'
));