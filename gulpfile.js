const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps')
const del = require('del');


gulp.task('sass', function () {
    return gulp.src('assets/sass/*.scss')
      .pipe(sourcemaps.init())
      .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('./public/stylesheets/'))
  })

  gulp.task('copy-node-js', function () {
    return gulp.src('node_modules/govuk-frontend/govuk/*.js')
      .pipe(gulp.dest('./public/javascripts/'))
  })


  gulp.task('copy-assets', function () {
    return gulp.src(['!' + 'assets/sass{,/**/*}',
      'assets/**'])
      .pipe(gulp.dest('./public/'))
  })

gulp.task('clean', () => {
    return del([
        './public/*',
    ]);
});

gulp.task('watch-sass', function () {
    return gulp.watch('assets/sass/**', { cwd: './' }, gulp.task('sass'))
  })
  
  gulp.task('watch-assets', function () {
    return gulp.watch(['assets/images/**',
      'assets/javascripts/**'], { cwd: './' }, gulp.task('copy-assets'))
  })


  gulp.task('generate-assets', gulp.series(
    'clean',
    gulp.parallel(
      'sass',
      'copy-node-js',
      'copy-assets'
    )
  ))




gulp.task('watch', gulp.parallel(
    'watch-sass',
    'watch-assets',
  ))
  gulp.task('default', gulp.series(
    'generate-assets',
    gulp.parallel(
      'watch'
    )
  ))