var gulp = require('gulp');
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var cp = require('child_process');
var browserSync = require('browser-sync').create();

var messages = {
    jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./_site"
        }
    });
});


gulp.task('jekyll-build', function (done) {
  browserSync.notify(messages.jekyllBuild);
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
  gulp.watch(['index.html', '_layouts/*.html', '_includes/*.html'], ['jekyll-rebuild']);
});

gulp.task('default', ['browser-sync', 'watch']);
