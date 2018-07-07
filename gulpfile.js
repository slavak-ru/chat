'use strict';

// plugins connections
const gulp = require("gulp");
const browserSync = require('browser-sync').create();
const pug = require('gulp-pug');

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

// compile form pug template into fuction
gulp.task('compileForm', function buildHTML() {
    return gulp.src('./components/form/form.templ.pug')
    .pipe(pug({
        client: true,
        name: 'formTemplate',
    }))
    .pipe(gulp.dest("./components/form"))
});

// compile chat pug template into fuction
gulp.task('compileChat', function buildHTML() {
    return gulp.src('./components/chat/chat.templ.pug')
    .pipe(pug({
        client: true,
        name: 'chatTemplate',
    }))
    .pipe(gulp.dest("./components/chat"))
});

// static server
gulp.task('serve', function () {
    browserSync.init({
        server: '.'
    });

    browserSync.watch('./**/*.*').on('change', browserSync.reload);
});


gulp.task('default', ['compileForm', 'compileChat', 'serve']);
//gulp.task("start", gulp.series("compile", gulp.parallel("serve")));