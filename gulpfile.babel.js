import gulp from 'gulp';
import server from 'browser-sync';

const paths = {
	dist: './dist/',
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
	return del([paths.dist + '**'], {
		force: true
	});
});
gulp.task('copy', ['clean'], () => {
	return gulp.src(paths.static, {
		base: 'src'
	}).pipe(gulp.dest(paths.dist));
});

gulp.task('styles', () => {});
gulp.task('serve', () => {
	return server.init({
		files: [`${paths.dist}/**`],
		port: 4000,
		server: {
			baseDir: paths.dist
		}
	});
});
gulp.task('watch', function () {});

gulp.task('default', [
	'copy',
	'styles',
	'serve',
	'watch'
]);