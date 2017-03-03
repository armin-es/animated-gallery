var gulp = require('gulp');
var eslint = require('gulp-eslint');
var concat = require('gulp-concat');

//JS Lint Task:
gulp.task('lint', function() {
    return gulp.src('src/js/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

//Concat. CSS files Task:
gulp.task('concat-js', function() {
    return gulp.src(['./src/js/style.css', './node_modules/jquery-fancybox/source/**/*.css'])
    .pipe(concat('main.css'))
    .pipe(gulp.dest('./dist/css/'));
});

//Concat. JS files Task:
gulp.task('concat-js', function() {
    return gulp.src(['./node_modules/jquery/dist/jquery.js', 'src/js/jquery.quicksand.js', './node_modules/jquery-fancybox/source/**/*.js', './src/js/script.js'])
    .pipe(concat('main.js'))
    .pipe(gulp.dest('./dist/js/'));
});

// Watch Task:
gulp.task('watch', function() {
    gulp.watch('src/js/*.js', ['lint']);
});

// Default Task:
gulp.task('default', ['lint', 'watch']);