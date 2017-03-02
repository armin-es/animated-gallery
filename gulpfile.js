var gulp = require('gulp');
var eslint = require('gulp-eslint');

gulp.task('lint', function() {
    return gulp.src('src/js/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.watch('src/js/*.js', ['lint']);

gulp.task('default', ['lint'], function() {
    // This will only run if the lint task is successful...
});