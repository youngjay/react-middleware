var gulp = require('gulp');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var through = require('through2');
var _ = require('lodash');
var glob = require('glob');
var pather = require('path');

gulp.task('entry', function() {
    var SCRIPT_CONTENT_TEMPLATE = _.template('require("<%=clientPath%>")(require("<%=componentPath%>"))');

    return gulp.src('./page/**/*.js')
        .pipe(through.obj(function(file, enc, cb) {     
            var relative = pather.relative(file.path, './page');

            file.contents = new Buffer(SCRIPT_CONTENT_TEMPLATE({
                clientPath: pather.join(relative, './client'),
                componentPath: pather.join(relative, './page', file.relative)
            }));
            this.push(file);
            cb();
        }))
        .pipe(gulp.dest('./entry'))
});

gulp.task('build', function() {

    glob('./entry/**/*.js', function(err, files) {   

        var bundler = watchify(browserify(_.extend({
            transform: [reactify]
        }, watchify.args)));
           
        files.forEach(function(file) {
            bundler.require(file, {
                entry: true
            });
        })

        bundler.plugin('factor-bundle', { outputs: files.map(function(file) {
            return file.replace('./entry/', './build/')
        })})

        var bundle = function() {            
            bundler.bundle()
                .pipe(source('common.js'))
                .pipe(gulp.dest('./build'))
        };

        bundler.on('update', bundle); // on any dep update, runs the bundler
        bundle();
    });
});

gulp.task('test', function() {
     browserify({
            transform: [reactify]
        })
        .add('./build/about/about.js')
        .bundle()
        .pipe(source('common.js'))
        .pipe(gulp.dest('./build'))
})


