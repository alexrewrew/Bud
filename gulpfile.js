var gulp = require("gulp");  //gulp
var browserSync = require("browser-sync"); //bower sync
var concat = require("gulp-concat"); //concat js
var uglify = require("gulp-uglify"); //min js
var cleanCSS = require("gulp-clean-css"); //min css
var htmlmin = require("gulp-html-minifier"); //min html
var autoprefixer = require("gulp-autoprefixer"); //autoprefixer
var csscomb = require("gulp-csscomb"); //css combine
var rimraf = require("rimraf"); //clean dist
var imagemin = require("gulp-imagemin"); //min image
var pug = require("gulp-pug"); //compile pug
var stylus = require("gulp-stylus"); //compile stylus
var notify = require("gulp-notify"); //notify
var runSequence = require("run-sequence");

//browser sync
gulp.task("browserSync", function () {
    browserSync({
        server: {
            baseDir: "app"
        }
    });
});


//stylus compilation
gulp.task("stylus", function () {
    return gulp.src(["app/stylus/style.styl", 'app/stylus/vendor.styl'])
        .pipe(stylus({"include css": true}).on("error", notify.onError(function (error) {
            return "An error occurred while compiling stylus.\nLook in the console for details.\n" + error;
        })))
        .pipe(autoprefixer({
            browsers: ["last 5 versions", "ie 8", "ie 9", "ie 10"],
            cascade: false
        }))
        .pipe(csscomb())
        .pipe(gulp.dest("app/css"))
        .pipe(browserSync.reload({
            stream: true
        }));
});

//pug compilation
gulp.task("pug", function buildHTML() {
    return gulp.src("app/pages/*.pug")
        .pipe(pug({pretty: true}).on("error", notify.onError(function (error) {
            return "An error occurred while compiling jade.\nLook in the console for details.\n" + error;
        })))
        .pipe(gulp.dest("app/"));
});

//js concat jquery
gulp.task("scripts1", function () {
    return gulp.src([
        "app/libs/jquery/dist/jquery.js",
        // "app/libs/popper.js/dist/popper.js",
        // "app/libs/jquery-ui/jquery-ui.js",
        // "app/libs/tether/dist/js/tether.js",
    ])
        .pipe(concat("jquery.js"))
        .pipe(gulp.dest("app/js"));
});

//js concat vendor
gulp.task("scripts2", function () {
    return gulp.src([
        // "app/libs/bootstrap/dist/js/bootstrap.js",
        // "app/libs/bootstrap3/dist/js/bootstrap.js",
        // "app/libs/chosen/chosen.jquery.js",
        // "app/libs/chosen-image/chosenImage/chosenImage.jquery.js",
        // "app/libs/iCheck/icheck.js",
        // "app/libs/slick-carousel/slick/slick.js",
        // "app/libs/remodal/dist/remodal.js",
        // "app/libs/modaal/dist/js/modaal.js",
        // "app/libs/magnific-popup/dist/jquery.magnific-popup.js",
        // "app/libs/fancybox/dist/jquery.fancybox.js",
        // "app/libs/wow/dist/wow.js",
        // "app/libs/jquery-scrollspy/jquery-scrollspy.js",
        // "app/libs/ddscrollspy/ddscrollspy.js",
        // "app/libs/jquery.maskedinput/dist/jquery.maskedinput.js",
        // "app/libs/jquery-validation/dist/jquery.validate.js",
        // 'app/libs/fullpage.js/vendors/jquery.easings.min.js',
        // 'app/libs/fullpage.js/vendors/scrolloverflow.js',
        // 'app/libs/fullpage.js/dist/jquery.fullpage.js'
        'app/libs/flipclock/compiled/flipclock.js'
    ])
        .pipe(concat("vendor.js"))
        .pipe(gulp.dest("app/js"));
});

//js concat custom
gulp.task("scripts3", function () {
    return gulp.src([
        // "app/libs/rew-downnav/downnav.js",
        // "app/libs/rew-sidenav/sidenav.js",
        "app/js/scripts/mail.js",
        "app/js/scripts/scripts.js"
    ])
        .pipe(concat("scripts.js"))
        .pipe(gulp.dest("app/js"));
});

//--------BUILD

//clean dest
gulp.task("clean", function (cb) {
    rimraf("./dist/*", cb);
});

//js minify
gulp.task("compress", function () {
    return gulp.src(["app/js/scripts.js", 'app/js/jquery.js', 'app/js/vendor.js'])
        .pipe(uglify())
        .pipe(gulp.dest("dist/js"));
});

// css minify
gulp.task("minify-css", function () {
    return gulp.src("app/css/*")
        .pipe(cleanCSS())
        .pipe(gulp.dest("dist/css"));
});

//html minify
gulp.task("minify-html", function () {
    gulp.src("app/*.html")
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest("dist"));
});

//img minify
gulp.task("imagemin", function () {
    gulp.src("app/img/**/*")
        .pipe(imagemin())
        .pipe(gulp.dest("dist/img"));
});

//copy fonts
gulp.task("fonts", function () {
    return gulp.src("app/fonts/**/*")
        .pipe(gulp.dest("dist/fonts"));
});

//copy media
gulp.task("media", function () {
    return gulp.src("app/media/**/*")
        .pipe(gulp.dest("dist/media"));
});

//copy php
gulp.task("php", function () {
    return gulp.src("app/php/**/*")
        .pipe(gulp.dest("dist/php"));
});


//build
gulp.task("develope", ["fonts", "media", "php", "imagemin", "minify-css", "compress", "minify-html"], function () {
});

gulp.task("compile", ["scripts1", "scripts2", "scripts3", "pug", "stylus"], function() {
});

gulp.task("build", function (callback) {
    runSequence("clean",
        "compile",
        "develope",
        callback);
});

//watch
gulp.task("watch", ["scripts1", "scripts2", "scripts3", "pug", "browserSync", "stylus"], function () { //запуск browser-sync та sass відслідковувачів
    gulp.watch("app/stylus/**/*.styl", ["stylus"]); //пошук scss файлів
    gulp.watch("app/libs/rew-sidenav/*.styl", ["stylus"]); //пошук scss файлів
    gulp.watch("app/pages/**/*.pug", ["pug"]); //пошук html файлів
    gulp.watch(["app/js/scripts/*.js"], ["scripts3"]); //пошук html файлів
    gulp.watch(["app/libs/rew-sidenav/*.js"], ["scripts3"]); //пошук html файлів
    gulp.watch("app/*.html", browserSync.reload); //пошук html файлів
    gulp.watch("app/js/*.js", browserSync.reload); //пошук js файлів
});