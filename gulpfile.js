
var gulp = require('gulp'),
    watch = require('gulp-watch'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    rename = require("gulp-rename"),
    imagemin = require('gulp-imagemin'),
    copy = require('gulp-contrib-copy');

var rootDir = "./";

var path = {
    build: {
        js: rootDir + 'dist/js/',
        css: rootDir + 'dist/css/',
        root: rootDir + 'dist'
    },
    src: {
        js: rootDir + 'front-end/js/main.js',
        scss: rootDir + 'front-end/scss/main.scss',
        fonts: rootDir + 'front-end/fonts/**/*.*'
    },
    watch: {
        js: rootDir + 'front-end/js/**/*.js',
        scss: rootDir + 'front-end/scss/**/*.scss'
    }
};

/*----------------------------- WATCHERS -----------------------------*/

gulp.task('js', function () { // Конкатенация всех JS файлов
    return gulp.src([path.src.js, path.watch.js])
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(path.build.js));
});

gulp.task('sass', function () {
    gulp.src([path.src.scss])
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(autoprefixer())
        .pipe(rename({
            basename: "style",
            suffix: '.min'
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.css));
});

gulp.task('app', ['js', 'sass']);

/*----------------------------- VENDORS -----------------------------*/

gulp.task('concatVendorJS', function () {
    return gulp.src([
        'node_modules/jquery/dist/jquery.min.js',
    ])
        .pipe(concat('vendors.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(path.build.js));
});

gulp.task('concatVendorCSS', function () {
    return gulp.src([
                'node_modules/bootstrap/dist/css/bootstrap.min.css',
                'node_modules/owl.carousel/dist/assets/owl.carousel.min.css',
                'front-end/scss/vendors/сubeportfolio.min.css'
    ])
        .pipe(concat('vendors.min.css'))
        .pipe(gulp.dest(path.build.css));
});

gulp.task('vendor', ['concatVendorJS', 'concatVendorCSS']);

/*----------------------------- LAUNCHERS -----------------------------*/

gulp.task('watch', function () {
    gulp.watch([path.watch.js], ['js']);
    gulp.watch([path.watch.scss], ['sass']);
});

gulp.task('default', ['app', 'watch']);
gulp.task('build', ['vendor', 'app']);
