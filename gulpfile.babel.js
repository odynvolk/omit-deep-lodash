'use strict';

import babel from 'gulp-babel';
import del from 'del';
import gulp from 'gulp';


const dirs = {
  src: 'src',
  dest: 'lib',
};

const sources = {
  scripts: `${dirs.src}/**/*.js`,
};

const build = () => gulp.src(sources.scripts)
  .pipe(babel())
  .pipe(gulp.dest(dirs.dest));

gulp.task('build', build);

gulp.task('clean', () => del([`${dirs.dest}/**`]));

gulp.task('default', ['clean'], build);