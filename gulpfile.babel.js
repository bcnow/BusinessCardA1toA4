import gulp from 'gulp';
import server from 'browser-sync';
import del from 'del';
import sass from 'gulp-sass';

const root = 'src/';
const paths = {
	dist: './dist/',
	bower: './bower_components/',
	distDocs: './docs/build',
	docs: './docs/app/*.js',
	scripts: [`${root}/app/**/*.js`, `!${root}/app/**/*.spec.js`],
	tests: `${root}/app/**/*.spec.js`,
	styles: `${root}/sass/*.scss`,
	templates: `${root}/app/**/*.html`,
	modules: [
		'angular/angular.js',
		'angular-ui-router/release/angular-ui-router.js',
		'firebase/firebase.js',
		'angularfire/dist/angularfire.js',
		'angular-loading-bar/build/loading-bar.min.js'
	],
	static: [
		`${root}/index.html`,
		`${root}/fonts/**/*`,
		`${root}/img/**/*`
	]
};

//var gulp = require('gulp')

server.create();

gulp.task('clean', () => {
	return del.sync([paths.dist + '**/*', ], {
		force: true
	});
});

gulp.task('copy', ['clean'], () => {
	return gulp.src(paths.static, {
		base: 'src'
	}).pipe(gulp.dest(paths.dist));
});

gulp.task('scripts-vendors', () => {
	return gulp.src([
			paths.bower + 'bootstrap/dist/js/bootstrap.js',
			paths.bower + 'jquery/dist/jquery.js',
			paths.bower + 'angular/angular.js',
			paths.bower + 'angular-ui-router/release/angular-ui-router.js'
		])
		.pipe(gulp.dest(paths.dist + '/js'));
});

gulp.task('scripts-bundle', ['scripts-vendors'], () => {
	return gulp.src([
			'./src/app/**/*',
		])
		.pipe(gulp.dest(paths.dist + '/js/app'));
});

gulp.task('styles-3rd-party', () => {
	return gulp.src(paths.bower + 'bootstrap/dist/css/bootstrap.min.css')
		.pipe(gulp.dest(paths.dist + '/css'));
});

gulp.task('styles', ['styles-3rd-party'], () => {
	return gulp.src(paths.styles)
		.pipe(sass({
			outputStyle: 'compact'
		}).on('error', sass.logError))
		.pipe(gulp.dest(paths.dist + '/css'));
});

gulp.task('serve', () => {
	return server.init({
		files: [`${paths.dist}/**`],
		port: 4000,
		server: {
			baseDir: paths.dist
		},
		logLevel: 'debug'
	});
});
gulp.task('watch', function () {
	gulp.watch([paths.scripts, paths.templates], ['scripts-bundle']);
	gulp.watch(paths.styles, ['styles']);
});

gulp.task('watch-n-serve', ['default', 'watch', 'serve'], () => {

});

gulp.task('default', [
	'copy',
	'styles',
	'scripts-vendors',
	'scripts-bundle'
]);