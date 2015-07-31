var gulp = require('gulp');
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');

gulp.task('sass', function () {
  return gulp.src('_scss/main.scss')
         .pipe(sass())
         .pipe(prefix())
         .pipe(gulp.dest('./css'));
});

gulp.task('watch', function () {
  gulp.watch('_scss/*.scss', ['sass']);
});
