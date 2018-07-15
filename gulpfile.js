'use strict';

// plugins connections
const gulp = require("gulp");
const browserSync = require('browser-sync').create();
const pug = require('gulp-pug');
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

let pugOption = {
        name: 'chatTemplate',
}

gulp.task('compileChat', function buildHTML() {
    return gulp.src('./components/chat/chat.templ.pug')
    //.pipe(pug(Object.assign({client: true, name: 'Template'}, {name: path.basename(__filename)})))
    .pipe(pug(Object.assign({client: true, name: 'Template'}, pugOption)))
    .pipe(gulp.dest('./components/chat'))
});
setTimeout(()=>console.log(pugOption.name), 1000)

// static server
gulp.task('serve', function () {
    browserSync.init({
        server: '.'
    });

    browserSync.watch('./**/*.*').on('change', browserSync.reload);
});


gulp.task('default', ['compileApp', 'compileForm', 'compileChat', 'serve']);