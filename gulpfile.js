const {
  src,
  dest,
  series
} = require('gulp');

const gulp = require('gulp'),
  fs = require('fs'),
  sync = require('browser-sync').create(),
  include = require('gulp-file-include'),
  del = require('del'),
  sass = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  group_media = require('gulp-group-css-media-queries'),
  clean_css = require('gulp-clean-css'),
  uglify = require('gulp-uglify-es').default,
  babel = require("gulp-babel"),
  imagemin = require('gulp-imagemin'),
  webp = require('gulp-webp'),
  webpHTML = require('gulp-webp-html'),
  webpCss = require('gulp-webp-css'),
  fonter = require('gulp-fonter'),
  sourcemaps = require('gulp-sourcemaps'),
  project_folder = 'dist',
  assets = '/assets',
  source_folder = 'src',
  path = {
      build: {
          html: project_folder + '/',
          css: project_folder + assets + '/css/',
          img: project_folder + assets + '/img/',
          js: project_folder + assets + '/js/',
          fonts: project_folder + assets + '/fonts/',
      },
      src: {
          html: source_folder + '/',
          css: source_folder + assets + '/scss/index.scss',
          bootstrap: source_folder + assets + '/scss/*.css',
          img: source_folder + assets + '/img/**/*.{jpg,png,svg,gif,ico,webp}',
          js: source_folder + assets + '/js/*.js',
          otherScripts: source_folder + assets + '/js/otherScripts/*.js',
          fonts: source_folder + assets + '/fonts/*.{ttf,eot,woff}',
      },
      watch: {
          html: source_folder + '/**/*.html',
          css: source_folder + assets + '/scss/**/*.scss',
          img: source_folder + assets + '/img/**/*.{jpg,png,svg,gif,ico,webp}',
          js: source_folder + assets + '/js/**/*.js',
      },
      clear: './' + project_folder + '/'
  }

function browserSync(params) {
  sync.init({
      server: {
          baseDir: path.clear
      },
      port: 1888,
      notify: false
  })
}

function html() {
  return src(path.src.html + '*.html')
      .pipe(include({
          prefix: '@@'
      }))
      .pipe(webpHTML())
      .pipe(dest(path.build.html))
      .pipe(sync.stream())
}

function watchFiles() {
  gulp.watch([path.watch.html], html)
  gulp.watch([path.watch.css], css)
  gulp.watch([path.watch.js], js)
  gulp.watch([path.watch.img], images)
}

function clear() {
  return del(path.clear)
}

function css() {
  return src(path.src.css)
      .pipe(sourcemaps.init())
      .pipe(sass({
          outputStyle: 'expanded'
      }))
      .pipe(group_media())
      //.pipe(webpCss())
      .pipe(autoprefixer({
          overrideBrowserslist: ['last 5 versions'],
          cascade: true
      }))
      .pipe(clean_css())
      .pipe(sourcemaps.write())
      .pipe(dest(path.build.css))
      .pipe(src(path.src.bootstrap))
      .pipe(dest(path.build.css))
      .pipe(sync.stream())
}

function js() {
  return src(path.src.js)
      .pipe(sourcemaps.init())
      .pipe(include())
      .pipe(babel())
      .pipe(uglify())
      .pipe(sourcemaps.write())
      .pipe(dest(path.build.js))
      .pipe(src(path.src.otherScripts))
      .pipe(dest(path.build.js))
      .pipe(sync.stream())
}

function images() {
  return src(path.src.img)
      .pipe(webp({
          quality: 70
      }))
      .pipe(dest(path.build.img))
      .pipe(src(path.src.img))
      .pipe(imagemin({
          progressive: true,
          svgoPlugins: [{
              removeViewBox: false
          }],
          interlaced: true,
          optimizationLevel: 3
      }))
      .pipe(dest(path.build.img))
      .pipe(sync.stream())
}

function fonts() {
  return src(path.src.fonts)
      //.pipe(fonter())
      .pipe(dest(path.build.fonts))
      .pipe(sync.stream())
}

const build = gulp.series(clear, gulp.parallel(js, css, html, images, fonts)),
  watch = gulp.parallel(build, watchFiles, browserSync);

exports.fonts = fonts;
exports.images = images;
exports.js = js;
exports.css = css;
exports.html = html;
exports.build = build;
exports.watch = watch;