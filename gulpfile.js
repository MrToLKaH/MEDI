const {src, dest, series, watch} = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const csso = require('gulp-csso');
const include = require('gulp-file-include');
const htmlmin = require('gulp-htmlmin');
const del = require('del');
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const sync = require('browser-sync').create();
const imagemin = require('gulp-imagemin');

function html() {
    return src('src/pages/**.html')
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(dest('assets'));
}

function scss() {
    return src('src/scss/**.scss')
        .pipe(sass())
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(csso())
        .pipe(concat('styles.css'))
        .pipe(dest('assets'));
}

function img() {
    return src('src/img/**.**')
        .pipe(imagemin())
        .pipe(dest('assets/img'));
}

function clear() {
    return del('assets');
}

function serv() {
    sync.init({
        server: './assets'
    })

    watch('src/pages/**.html', series(html)).on('change', sync.reload)
    watch('src/scss/**.scss', series(scss)).on('change', sync.reload)
}
exports.build = series(clear, scss, html, img);
exports.scss = scss;
exports.serv = series(clear, scss, html, img, serv);
