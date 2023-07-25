var gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
var fileinclude = require('gulp-file-include');
var browserSync = require('browser-sync').create();
const fs = require('fs');
const cheerio = require('cheerio');
var recursiveReadSync = require('recursive-readdir-sync');
var path = require('path');
var projectRoot = path.resolve(__dirname, 'dev');

var paths = {
  styles: {
    src: 'dev/src/css/**/*.scss',
    dest: 'dist/src/css'
  },
  scripts: {
    src: 'dev/src/js/**/*.js',
    dest: 'dist/src/js'
  },
  images: {
    src: 'dev/src/images/**/*',
    dest: 'dist/src/images'
  }
}

gulp.task('sass', function(){
  return gulp.src('dev/src/css/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/src/css'));
});

// 이미지 파일 복사
gulp.task('copy:images', function(){
  return gulp.src('dev/src/images/**/*')
    .pipe(gulp.dest('dist/src/images'));
});

// 폰트 파일 복사
gulp.task('copy:fonts', function(){
  return gulp.src('dev/src/fonts/**/*')
    .pipe(gulp.dest('dist/src/fonts'));
});

gulp.task('extendsHtml', function() {
  return gulp.src('dev/src/html/_extends/extends_html5.html')
    .pipe(fileinclude({
      prefix: '@@',
      basepath: projectRoot
    }))
    .pipe(gulp.dest('dist/src/html/_extends'));
});

gulp.task('insertContent', gulp.series('extendsHtml', function(callback) {
  const extendsHtml = fs.readFileSync('dist/src/html/_extends/extends_html5.html', 'utf8');
  const $extends = cheerio.load(extendsHtml);

  try {
    let files = recursiveReadSync('dist/src/html');
    files.forEach(file => {
      if (file.endsWith('.html')) {
        const fileContent = fs.readFileSync(file, 'utf8');
        const $ = cheerio.load(fileContent);
        const container = $('#container');

        if (container.length) {
          const content = container.html();
          $extends('#container').html(content);
          fs.writeFileSync(file, $extends.html(), 'utf8');
        }
      }
    });

    callback();
  } catch(err){
    if(err.errno === 34){
      console.log('Path does not exist');
    } else {
      throw err;
    }

    callback(err);
  }
}));

gulp.task('html', function () {
  return gulp.src(['dev/**/*.html', '!dev/src/html/_extends/**']) // excludes _extends directory
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('dist/'));
});

gulp.task('serve', gulp.series('insertContent', function() {
  gulp.watch('./dev/src/css/*.scss', gulp.series('sass'));
  gulp.watch('./dev/**/*.html', gulp.series('html', 'insertContent'));
  gulp.watch('./dev/src/html/_extends/*.html', gulp.series('insertContent'));

  browserSync.init({
      server: {
          baseDir: ['./dist', './dev'],
          index: 'src/html/cl.html'
      },
      port: 8888
  });
}));

gulp.task('watch', function(){
  gulp.watch('./dev/src/css/*.scss', gulp.series('sass', browserSync.reload));
  gulp.watch('./dev/**/*.html', gulp.series('html', 'insertContent', browserSync.reload));
  gulp.watch('./dev/src/html/_extends/*.html', gulp.series('insertContent', browserSync.reload));
});

gulp.task('default', gulp.series('sass', 'html', 'insertContent', 'copy:images', 'copy:fonts', 'serve'));
