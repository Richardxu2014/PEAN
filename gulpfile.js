'use strict';


var gulp = require('gulp'),
    config = require('./config/config'),
    gulpLoadPlugins = require('gulp-load-plugins'),
    plugins = gulpLoadPlugins();

/*var defaultTasks = ['clean', 'jshint', 'less', 'csslint', 'devServe', 'watch'];*/
var defaultTasks = ['devServe', 'watch'];

gulp.task('js', function () {
    console.log('开始合并js--------------');
    console.log(config.getGlobbedFiles(config.assets.js));
    gulp.src(config.getGlobbedFiles(config.assets.js))
        .pipe(plugins.concat('app.js'))
        .pipe(gulp.dest('public/modules'))
});

gulp.task('devServe', function () {
    console.log('开始启动--------------');
    plugins.nodemon({
        script: 'server.js',
        ext: 'jade js',
        env: { 'NODE_ENV': 'development' } ,
        ignore: [
            'node_modules/',
            'logs/'
        ],
        stdout: false
    }).on('readable', function() {

        this.stdout.on('data', function(chunk) {
            if(/Mean app started/.test(chunk)) {
                setTimeout(function() {
                    plugins.livereload.reload();
                }, 500);
            }
            process.stdout.write(chunk);
        });
        this.stderr.pipe(process.stderr);
    });
});

gulp.task('watch', function () {
    console.log('开始监控js--------------');
    // Start livereload
    plugins.livereload.listen();
    //gulp.watch(['views/*.*']).on('change', function(file) {
    //    plugins.livereload.changed;
    //});
    gulp.watch(['*.*','config/*.*','app/*/*.*']).on('change', plugins.livereload.changed);
    //gulp.watch(paths.coffee,['coffee']);
    //gulp.watch(paths.js, ['jshint']);
    //gulp.watch(paths.css, ['csslint']).on('change', plugins.livereload.changed);
    //gulp.watch(paths.less, ['less']);
});


gulp.task('default', defaultTasks);
