let gulp = require('gulp');
let scss = require('gulp-scss');

gulp.task('css', function () {
    return gulp.src('resources/assets/sass/app.scss')
        .pipe(scss())
        .pipe(gulp.dest('assets/css'));
});

gulp.task('default', ['css']);