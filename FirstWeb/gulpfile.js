//Підключаємо gulp
const gulp = require ('gulp')
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;



//Створюємо тестовий таск
gulp.task ('testTask', function (done) {
    console.log ('This is a test task!')
    done()
})
//Запуск тасків за замовчуванням
gulp.task ('default', gulp.series('testTask'),function(){})

//const gulp = require ('gulp')
//додаткові плагіни Gulp
const sass = require ('gulp-sass'), //конвертує SASS в CSS
    cssnano = require ('gulp-cssnano'), //мінімізація CSS
    autoprefixer = require ('gulp-autoprefixer'), //додавання префіксів в
//CSS для підтримки
//старих браузерів
    imagemin = require ('gulp-imagemin'), //стиснення зображень
    concat = require ('gulp-concat'), //об&#39;єднання файлів - конкатенація
    uglify = require ('gulp-uglify'), //мінімізація javascript
    rename = require ('gulp-rename') //перейменування файлів



//копіювання HTML файлів в папку dist
gulp.task ('html', function () {
    reload();

    return gulp.src ( 'app / *. html')
        .pipe (gulp.dest ( 'dist'))
})

//об&#39;єднання, компіляція Sass в CSS, додавання префіксів і подальша
//мінімізація коду
gulp.task ( 'sass', function () {
    reload();

    return gulp.src ( 'app / sass / *. sass')
        .pipe (concat ('styles.sass'))
        .pipe (sass ())
        .pipe (autoprefixer ({
            browsers: [ 'last 2 versions'],
            cascade: false
        }))
        .pipe (cssnano ())
        .pipe (rename ({suffix: '.min'}))
        .pipe (gulp.dest ( 'dist / css'))
})

//об'єднання і стиснення JS-файлів
gulp.task ( 'scripts', function () {
    reload();

    return gulp.src ( 'app / js / *. js') //вихідна директорія файлів
        .pipe (concat ( 'scripts.js')) // конкатенація js-файлів в один
        .pipe (uglify ()) //стиснення коду
        .pipe (rename ({suffix: '.min'})) //перейменування файлу з
        //приставкою .min
        .pipe (gulp.dest ( 'dist / js')) // директорія продакшена
})

//cтискання зображень
gulp.task ( 'imgs', function () {
    reload();

    return gulp.src ('app / images /*.+ (jpg | jpeg | png | gif)')
        .pipe (imagemin ({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            interlaced: true
        }))
        .pipe (gulp.dest ( 'dist / images'))
})

//відстежування за змінами у файлах
gulp.task("watch", async () => {
    browserSync.init({
        server: "./app",
    });
    await gulp.watch("./app/*.html", gulp.series("html"));
    await gulp.watch("./app/js/*.js", gulp.series("scripts"));
    await gulp.watch("./app/sass/*.sass", gulp.series("sass"));
    await gulp.watch("./app/images/*.+(jpg|jpeg|png|gif)", gulp.series("imgs"));
});

//Запуск тасків за замовчуванням
 gulp.task ( 'default',  gulp.parallel('html', 'sass', 'scripts', 'imgs', 'watch'))