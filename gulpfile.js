const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync');
const reload = browserSync.reload;

const sassFiles = './assets/admin/pages/scss/**/*.scss',  
      cssDest = './assets/admin/pages/css/';

gulp.task('default', ['serve']);

gulp.task('serve', [], () => {
    browserSync({
        notify: false,
        server: {
            baseDir: '.'
        }
    });
    gulp.watch(['views/**/*.html'], reload);
    gulp.watch(['app/controllers/**/*.js'], reload);
    gulp.watch(['app/services/**/*.js'], reload);
});

gulp.task('styles', () => {
    gulp.src(sassFiles)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(cssDest))
});

//Watch task
gulp.task('watch', () => {  
    gulp.watch(sassFiles,['styles']);
});
