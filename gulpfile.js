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
// 打包js但先不壓縮
function packagejs() {
    return src('src/js/*.js').pipe(rename({
        extname: '.min.js' 
     })).pipe(dest('dist/js'))
 }
// 改檔名套件
const rename = require('gulp-rename');

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

// css壓縮套件
const cleanCSS = require('gulp-clean-css');
function minicss() {
    return src('./src/sass/*.scss')
       .pipe(sourcemaps.init())
       .pipe(sass.sync().on('error', sass.logError))
       .pipe(cleanCSS())
       .pipe(rename({
          extname: '.min.css'
       }))
       .pipe(sourcemaps.write())
       .pipe(dest('dist/css'))
 }
 exports.c = minicss;

// 檔案整合套件
const concat = require('gulp-concat');
function concatall_css() {
   return src('src/*.css')
      .pipe(concat('all.css')) // 整合成一支css
      .pipe(cleanCSS()) // minify css
      .pipe(dest('dist/css'));
}
exports.allcss = concatall_css;

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

// 合併html的套件，使用@@作為變數宣告，@@作為引用代號
const fileinclude = require('gulp-file-include');
function includeHTML() {
    return src(['src/*.html' , 'src/backstage/*.html' ])
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
    watch(['src/sass/*.scss' , 'src/sass/**/*.scss'] , minicss).on('change' , reload);
    watch(['src/js/*.js' , 'src/js/**/*.js'] , packagejs).on('change' , reload);
    watch(['src/img/*.*' ,  'src/img/**/*.*'] , package).on('change' , reload);
    done();
 }

// ======= 上線 =======

// 圖片壓縮
const imagemin = require('gulp-imagemin');

function min_images(){
    return src(['src/img/*.*' , 'src/img/**/*.*'])
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 6}) // 壓縮品質      quality越低 -> 壓縮越大 -> 品質越差 
  ]))
    .pipe(dest('dist/img'))
}

 // js 瀏覽器適應 babel es6 -> es5

 const babel = require('gulp-babel');

 function babel5() {
     return src(['src/js/*.js' , 'src/js/**/*.js'])
         .pipe(babel({
             presets: ['@babel/env']
         }))
         .pipe(uglify())
         .pipe(dest('dist/js'));
 }

 exports.es5 =babel5

 // 清除舊檔案

const clean = require('gulp-clean');

function clear() {
  return src('dist' ,{ read: false ,allowEmpty: true })//不去讀檔案結構，增加刪除效率  / allowEmpty : 允許刪除空的檔案
  .pipe(clean({force: true})); //強制刪除檔案 
}

exports.cls = clear


exports.default = series(parallel(includeHTML, minicss, packagejs, package),browser) 
 
 // online
exports.online = series(clear, parallel(includeHTML, minicss, minijs, babel5, min_images))
 