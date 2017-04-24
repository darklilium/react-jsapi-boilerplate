var gulp = require('gulp');
var sass = require('gulp-sass');
var swig = require('gulp-swig');
var notify = require("gulp-notify");


function defaultError(type){
  return function(err){
    console.log(type + ' error : ' + err);
  };
}

function dist(path){
  return './dist/' + path;
}

function realPath(xs){
  return './src/' + xs;
}

var reportError = function (error) {
    notify({
        title: 'Gulp Task Error',
        message: 'Check the console.'
    }).write(error);

    console.log(error.toString());

    this.emit('end');
}

gulp.task('sass', function(){
  return gulp.src('./src/css/*.scss')
    .pipe(sass({ outputStyle: 'compact' }))
    .on('error', reportError)
    .pipe(gulp.dest(dist('css')))
});

gulp.task('css', function(){
  return gulp.src('./src/css/*.css')
    .pipe(sass({ outputStyle: 'compact' }))
    .on('error', reportError)
    .pipe(gulp.dest(dist('css')))
});


gulp.task('images', function(){
  return gulp.src('./src/css/images/**/*.png')
    .on('error', reportError)
    .pipe(gulp.dest(dist('css/images')))

});
gulp.task('html', function(){
  return gulp.src('*.html')
    .on('error', reportError)
    .pipe(gulp.dest(dist('')))

});

gulp.task('watch', function(){
  gulp.watch(['css/*.scss'].map(realPath), ['sass'],['css']);
  gulp.watch(['*.html']);


});


gulp.task('default', ['sass', 'images','watch', 'css','html']);
