var gulp = require('gulp'),
		changed = require('gulp-changed'),
		exec = require('gulp-exec'),
		fileinclude = require('gulp-file-include'),
		server = require('gulp-server-livereload');


gulp.task('all', ['copy', 'copyExercises', 'singlepage', 'ts'], function(){
});

var BUILD = './build/';

var copylist = [
	'./src/worker.js',
	'./src/*.html',
	'./babel/babel.js',
	'./node_modules/regenerator/runtime.js',
	'./TypeScript/built/local/typescript.js',
	'./bower_components/es6-promise/promise.min.js',
	'./bower_components/fetch/fetch.js',
];
var exercises = ['exercises/*'];

var tsfiles = [
	'./src/tscmini.ts'
];

gulp.task('default', ['all', 'webserver'], function(){
	gulp.watch('gulpfile.js', function() {
		process.exit(42);
	});
	gulp.watch(copylist, ['copy']);
	gulp.watch(exercises, ['copyExercises']);
	gulp.watch('./src/talk.md', ['singlepage']);
	gulp.watch(tsfiles, ['ts']);
});

gulp.task('copy', function(){
	gulp.src(copylist)
		.pipe(changed(BUILD))
		.pipe(gulp.dest(BUILD))
	;
});

gulp.task('copyExercises', function(){
	gulp.src(exercises)
		.pipe(gulp.dest(BUILD+'exercises/'))
	;
});

gulp.task('singlepage', function(){
	gulp.src(['remark/single_pg_pres.html'])
		.pipe(fileinclude({prefix: '@@', basepath: '@file'}))
		.pipe(gulp.dest(BUILD))
	;
});

var TSC="node TypeScript/built/local/tsc.js -t ES5 --noImplicitAny --sourceMap --outDir "+BUILD+" ./src/ts.d.ts <%= file.path %>";
gulp.task('ts', function() {
	gulp.src(tsfiles)
		.pipe(exec(TSC, {continueOnError: true}))
		.pipe(exec.reporter({}));
});

gulp.task('webserver', function(){
	gulp.src(BUILD)
		.pipe(server({
			livereload: {
				enable: true,
				filter: function(file, cb){
					cb(!/\.swp$/.test(file));
				}
			},
			host: '0.0.0.0'
		}));
});

