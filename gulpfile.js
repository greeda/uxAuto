var gulp = require("gulp");
var pug = require("gulp-pug");
const sass = require("gulp-sass")(require("sass"));
var fileinclude = require("gulp-file-include");
var browserSync = require("browser-sync").create();
const fs = require("fs");
const cheerio = require("cheerio");
var recursiveReadSync = require("recursive-readdir-sync");
var path = require("path");
var projectRoot = path.resolve(__dirname, "dev");
var uglify = require("gulp-uglify");
var babel = require("gulp-babel");

const isProduction = process.env.NODE_ENV ==='production';
const $path = isProduction ? '/wp-content/themes/fastfive-new' : '';

var paths = {
  styles: {
    src: "dev/src/css/**/*.scss",
    dest: "dist/src/css",
  },
  scripts: {
    src: "dev/src/js/**/*.js",
    dest: "dist/src/js",
  },
  images: {
    src: "dev/src/images/**/*",
    dest: "dist/src/images",
  },
};

gulp.task("sass", function () {
  return gulp
    .src("dev/src/css/**/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("dist/src/css"));
});

// 이미지 파일 복사
gulp.task("copy:images", function () {
  return gulp.src("dev/src/images/**/*").pipe(gulp.dest("dist/src/images"));
});

gulp.task("copy:js", function () {
  return gulp.src("dev/src/js/**/*").pipe(gulp.dest("dist/src/js"));
});

gulp.task(
  "js-watch",
  gulp.series("copy:js", function (done) {
    browserSync.reload();
    done();
  })
);

gulp.task("minify:js", function () {
  return gulp
    .src(["dev/src/js/**/*.js", "!dev/src/js/lib/**"])
    .pipe(
      babel({
        presets: ["@babel/preset-env"],
      })
    )
    .pipe(uglify())
    .pipe(gulp.dest("dist/src/js"));
});

gulp.task("babel:js", function () {
  return gulp
    .src("dev/src/js/**/*")
    .pipe(
      babel({
        presets: ["@babel/env"],
      })
    )
    .pipe(gulp.dest("dist/src/js"));
});

// 폰트 파일 복사
gulp.task("copy:fonts", function () {
  return gulp.src("dev/src/fonts/**/*").pipe(gulp.dest("dist/src/fonts"));
});

gulp.task("views", function buildHTML() {
  return gulp
    .src("dev/src/html/**/*.pug")
    .pipe(
      pug({
        pretty: true,
        locals: {
          path: $path
        }
      })
    )
    .pipe(gulp.dest("./dist/src/html"));
});

gulp.task("html", function () {
  return gulp
    .src(["dev/**/*.html", "!dev/src/html/_extends/**"])
    .pipe(
      fileinclude({
        prefix: "@@",
        basepath: "@file",
      })
    )
    .pipe(gulp.dest("dist/"));
});

gulp.task("reload", function (done) {
  browserSync.reload();
  done();
});

gulp.task("watch", function () {
  gulp.watch("./dev/src/css/*.scss", gulp.series("sass", "reload"));
  gulp.watch("./dev/**/*.html", gulp.series("html", "reload"));
  gulp.watch("./dev/**/*.pug", gulp.series("views", "reload"));
  gulp.watch("./dev/src/js/**/*.js", gulp.series("copy:js", "reload"));
});

gulp.task("serve", function () {
  gulp.watch("./dev/src/css/*.scss", gulp.series("sass", "reload"));
  gulp.watch("./dev/**/*.html", gulp.series("html", "reload"));
  gulp.watch("./dev/**/*.pug", gulp.series("views", "reload"));
  gulp.watch("./dev/src/js/**/*.js", gulp.series("js-watch", "reload"));

  browserSync.init({
    server: {
      baseDir: ["./dist", "./dev"],
      index: "src/html/cl.html",
    },
    port: 8888,
  });
});

gulp.task(
  "default",
  gulp.series(
    "sass",
    "html",
    "copy:images",
    "copy:fonts",
    "copy:js",
    "views",
    "serve"
  )
);

gulp.task(
  "build",
  gulp.series(
    "sass",
    "html",
    "copy:images",
    "copy:fonts",
    "copy:js",
    "views"
  )
);
