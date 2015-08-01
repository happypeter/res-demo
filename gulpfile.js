var gulp = require('gulp');
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var cp = require('child_process');
var browserSync = require('browser-sync').create();

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./_site"
        }
    });
});


gulp.task('jekyll-build', function (done) {
  return cp.spawn('jekyll', ['build'], {stdio: 'inherit'})
            .on('close', done);
});

gulp.task('jekyll-rebuild', ['jekyll-build'], function(){
  browserSync.reload();
});

gulp.task('sass', function () {
  return gulp.src('_scss/main.scss')
         .pipe(sass())
         .pipe(prefix())
         .pipe(gulp.dest('./_site/css'))
         .pipe(browserSync.stream())
         .pipe(gulp.dest('./css'));
});

gulp.task('watch', function () {
  gulp.watch('_scss/*.scss', ['sass']);
  gulp.watch(['index.html', '_layouts/*.html'], ['jekyll-rebuild']);
});

gulp.task('default', ['browser-sync', 'watch']);
