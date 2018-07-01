'use strict';

// plugins connections
const gulp = require("gulp");
const browserSync = require('browser-sync').create();

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

// static server
gulp.task('serve', function () {
    browserSync.init({
        server: '.'
    });

    browserSync.watch('./**/*.*').on('change', browserSync.reload);
});


