const {
    src,
    dest,
    series,
    parallel,
    watch
 } = require('gulp');

//  搬移檔案
// 將檔案從src搬移到dest路徑
function package() {
    return src(['src/img/*.*', 'src/img/**/*.*']).pipe(dest('dist/img'))
 }

// 改檔名套件
const rename = require('gulp-rename');

// css壓縮套件
const cleanCSS = require('gulp-clean-css');
function minicss() {
    return src('src/*.css')
       .pipe(cleanCSS())
       .pipe(rename({
          extname: '.min.css'
       }))
       .pipe(dest('dist/css'))
 }
 exports.c = minicss;

//  js壓縮套件 
const uglify = require('gulp-uglify');
function minijs() {
   return src('src/js/*.js')
      .pipe(uglify())
      .pipe(rename({
         extname: '.min.js' // 修改附檔名
         //prefix : 'web-' // 前綴字
         //suffix : '-min'  // 後綴字
         //basename : 'all' //更名
      }))
      .pipe(dest('dist/js'))
}
exports.ugjs = minijs;

// 檔案整合套件
const concat = require('gulp-concat');
function concatall_css() {
   return src('src/*.css')
      .pipe(concat('all.css')) // 整合成一支css
      .pipe(cleanCSS()) // minify css
      .pipe(dest('dist/css'));
}
exports.allcss = concatall_css;

// sass編譯
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
function sassstyle() {
    return src('./src/sass/*.scss')
       .pipe(sourcemaps.init())
       .pipe(sass.sync().on('error', sass.logError))
       .pipe(sourcemaps.write())
       .pipe(dest('./dist/css'));
 }
exports.s = sassstyle;

// 合併html的套件，使用@@作為變數宣告，@@作為引用代號
const fileinclude = require('gulp-file-include');
function includeHTML() {
    return src('src/*.html')
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(dest('./dist'));
}
exports.html = includeHTML;

// 監聽所有檔案，使用時不可再按下watch sass，會導致系統錯亂
function watchall(){
    watch(['src/*.html' , 'src/layout/*.html' ,] , includeHTML);
    watch(['src/sass/*.scss' , 'src/sass/**/*.scss'] , sassstyle);
 }
exports.w = watchall
 
// 網頁預覽套件
const browserSync = require('browser-sync');
const reload = browserSync.reload;
function browser(done) {
    browserSync.init({
        server: {
            baseDir: "./dist",
            index: "index.html"
         },
        port: 3000
     });
    watch(['src/*.html' , 'src/layout/*.html' ,] , includeHTML).on('change' , reload);
    watch(['src/sass/*.scss' , 'src/sass/**/*.scss'] , sassstyle).on('change' , reload);
    watch(['src/js/*.js' , 'src/js/**/*.js'] , minijs).on('change' , reload);
    watch(['src/img/*.*' ,  'src/img/**/*.*'] , package).on('change' , reload);
    done();
 }
 exports.default = series(parallel(includeHTML ,sassstyle, minijs ,package),browser)    
 