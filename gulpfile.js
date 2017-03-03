var gulp = require('gulp');
var eslint = require('gulp-eslint');
var concat = require('gulp-concat');
var cleanCSS = require('gulp-clean-css');
var jsmin = require('gulp-jsmin');
var rename = require('gulp-rename');
var clean = require('gulp-clean');

// ------- CSS Tasks ------- //

// Concat.:
gulp.task('concat-css', function() {
    return gulp.src(['./src/js/style.css', './node_modules/jquery-fancybox/source/**/*.css'])
    .pipe(concat('main.css'))
    .pipe(gulp.dest('./dist/css'));
});

// Minify:
gulp.task('minify-css', ['concat-css'], function() {
    return gulp.src('./src/css/main.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('./dist/css'));
});

// ------- JS Tasks ------- //

// Lint:
gulp.task('lint-js', function() {
    return gulp.src('src/js/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});


// Concat.:
gulp.task('concat-js', ['lint-js'], function() {
    return gulp.src(['./node_modules/jquery/dist/jquery.js', 'src/js/jquery.quicksand.js', './node_modules/jquery-fancybox/source/**/*.js', './src/js/script.js'])
    .pipe(concat('main.js'))
    .pipe(gulp.dest('./dist/js'));
});

// Minify:
gulp.task('minify-js', ['concat-js'], function() {
    return gulp.src('./dist/js/main.js')
    .pipe(jsmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./dist/js'))
    .pipe(clean());
});

// img copy task:
gulp.task('copy-img', function() {
    return gulp.src('./src/img/**/*')
    .pipe(gulp.dest('./dist/img'));
});

// Watch Task:
gulp.task('watch', function() {
    gulp.watch('./src/css/*.css', ['minify-css']);
    gulp.watch('./src/js/*.js', ['minify-js']);
});

// Default Task:
gulp.task('default', ['minify-css', 'lint-js', 'watch']);