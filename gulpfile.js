// ----- gulp required var
var gulp         = require('gulp'),
    svgstore     = require('gulp-svgstore'),
    imagemin     = require('gulp-imagemin'),
    jsmin        = require('gulp-uglify'),
    svgmin       = require('gulp-svgmin'),
    path         = require('path'),
    sass         = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps   = require('gulp-sourcemaps'),
    browserSync  = require('browser-sync').create();

// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        open: "external",
        proxy: "mylgsite.dev/"
      });
});

// ----- Path Configurations
var config = {
    sassPath    : './src/sass',
    jsPath      : './src/js',
    jsPublic    : './js',
    svgPath     : './src/svg-icons',
    nodePath    : './node_modules',
    imagePublic : './images',
    imagesrc    : './src/images'
};

// ---- SASS Load Paths
var sassLoad = [
    config.nodePath + '/bootstrap-sass/assets/stylesheets/bootstrap',
    config.nodePath + '/susy/sass',
    config.nodePath + '/breakpoint-sass/stylesheets/',
    config.nodePath + '/font-awesome/scss'
];

// Copy Fonts from npm font-awesome folder
gulp.task('font2font', function() {
    gulp.src(config.nodePath + '/font-awesome/fonts/**/*.*')
    .pipe(gulp.dest('./fonts'));
});

// ----- Copy bootstrap js stuff
gulp.task('bootstrap2theme', function() {
    gulp.src(config.nodePath + '/bootstrap-sass/assets/javascripts/bootstrap.min.js')
    .pipe(gulp.dest(config.jsPublic));
});

// ----- Copy some stuff
gulp.task('depend2dev', function() {

});

// ----- SASS
gulp.task('sass', function() {
 return gulp.src(config.sassPath + '/**/*.scss')
 .pipe(sourcemaps.init())
     .pipe(sass({ outputStyle: 'compressed', includePaths: sassLoad })
     .on('error', sass.logError))
 .pipe(autoprefixer({ browsers: ['last 3 versions']}))
 .pipe(sourcemaps.write('.'))
 .pipe(gulp.dest('.'))
 .pipe(browserSync.stream());
 // .pipe(browserSync.stream());
});

// ----- SVG Store
gulp.task('svgstore', function () {
  return gulp
      .src(config.svgPath + '/**/*.svg')
      .pipe(svgmin(function (file) {
          var prefix = path.basename(file.relative, path.extname(file.relative));
          return {
              plugins: [{
                  cleanupIDs: {
                      prefix: prefix + '-',
                      minify: true
                  }
              }]
          }
      }))
      .pipe(svgstore())
      .pipe(gulp.dest(config.imagePublic));
});

// ----- Image Min
gulp.task('imagemin', function(){
  gulp.src(config.imagesrc + '/**/*').pipe(imagemin()).pipe(gulp.dest( config.imagePublic));
});

// ----- js min
gulp.task('jsmin', function(){
  gulp.src(config.jsPath + '/**/*')
  .pipe(jsmin())
  .pipe(gulp.dest( config.jsPublic ));
});

// ----- Watch
gulp.task('watch', function(){
  gulp.watch(config.sassPath + '/**/*.scss', ['sass']);
  gulp.watch(config.imagesrc + '/**/*', ['imagemin']);
  gulp.watch(config.jsPath + '/**/*', ['jsmin']);
	gulp.watch(config.svgPath + '/**/*', ['svgstore']);
});

// ----- Default
gulp.task('default', ['browser-sync', 'sass', 'imagemin', 'jsmin', 'svgstore', 'watch' ]);