'use strict';

// plugins connections
const gulp = require("gulp");
const browserSync = require('browser-sync').create();
const pug = require('gulp-pug');
const through2 = require('through2').obj;
//const path = require('path');
//const debug = require('gulp-debug');

let src = {
    css:  './**/*.css',
    html: './*.html',
    js: './**/*.js'
};
    
// test task
gulp.task('test', function() {
        return console.log('HELLO WORLD');
    }
);

// compile app pug template into fuction
gulp.task('compileApp', function buildHTML() {
    return gulp.src('./components/app/app.templ.pug')
    .pipe(pug({
        client: true,
        name: 'appTemplate',
    }))
    .pipe(gulp.dest('./components/app'))
});

// compile form pug template into fuction
gulp.task('compileForm', function buildHTML() {
    return gulp.src('./components/form/form.templ.pug')
    .pipe(pug({
        client: true,
        name: 'formTemplate',
    }))
    .pipe(gulp.dest('./components/form'))
});

// compile chat pug template into fuction

const setFuncName = through2(function(file, enc, callback) {  
    this.funcName = file.relative.split('\\').slice(-1).join().split('.')[0] + 'Template';
    this.pugOptions = {client: true, name: this.funcName};
    //this.push(this.pugOptions); // валит поток
    callback(null, file);
});

gulp.task('compileChat', function buildHTML() {
    return gulp.src('./components/chat/*.pug')

    .pipe(setFuncName)
    //.pipe(pug(this.pugOptions))
    .pipe(pug({client: true, name: 'chatTemplate'}))
    .pipe(gulp.dest('./components/chat'))
});


// static server
gulp.task('serve', function () {
    browserSync.init({
        server: '.'
    });

    browserSync.watch('./**/*.*').on('change', browserSync.reload);
});


gulp.task('default', ['compileApp', 'compileForm', 'compileChat', 'serve']);