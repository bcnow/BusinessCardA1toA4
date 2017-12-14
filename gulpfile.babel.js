import gulp from 'gulp';
import server from 'browser-sync';
import del from 'del';
import sass from 'gulp-sass';
// import concat from 'gulp-concat';
import concat from 'gulp-concat';
import templateCache from 'gulp-angular-templatecache';
import babel from 'gulp-babel';
import ts from 'gulp-typescript';

const tsProject = ts.createProject('tsconfig.json');
const root = 'src/';
const mainAngularModuleName = 'root';
const paths = {
	dist: './dist/',
	distJs: './dist/' + 'js',
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

gulp.task('scripts:vendors', () => {
	return gulp.src([
			paths.bower + 'jquery/dist/jquery.js',
			paths.bower + 'bootstrap/dist/js/bootstrap.js',
			paths.bower + 'angular/angular.js',
			paths.bower + 'angular-ui-router/release/angular-ui-router.js',
			paths.bower + 'lodash/dist/lodash.js',
			paths.bower + 'lokijs/src/lokijs.js',
			paths.bower + 'lokijs/src/loki-angular.js'
		])
		.pipe(concat('vendors.js'))
		.pipe(gulp.dest(paths.dist + '/js'));
});

gulp.task('scripts:template-cache', function () {
	return gulp.src('src/**/*.html')
		.pipe(templateCache({
			module: mainAngularModuleName
		}))
		.pipe(gulp.dest(paths.dist + '/js'));
});

gulp.task('scripts:bundle-typescript', function () {
	var tsResult = gulp.src('./src/**/*.ts') // or tsProject.src()
		.pipe(tsProject());

	return tsResult.js.pipe(gulp.dest(paths.distJs));
	// return gulp.src('src/**/*.ts')
	// 	.pipe(templateCache({
	// 		module: mainAngularModuleName
	// 	}))
	// 	.pipe(gulp.dest(paths.dist + '/js'));
});
gulp.task('scripts:all', ['scripts:vendors', 'scripts:template-cache', 'scripts:bundle-typescript', 'scripts:bundle'], () => {

});
gulp.task('scripts:bundle', () => { // ['scripts:vendors', 'scripts:template-cache']
	return gulp.src(['./src/app/root.module.js', './src/**/*.js', '!./src/es6/**/*.js'])
		.pipe(concat('bundle.js'))
		.pipe(gulp.dest(paths.dist + '/js'));
});
//----------------
// ekperiment - ES 6
//----------------

gulp.task('babel', function () { // not used anywhere
	return gulp.src('./src/es6/**/*.js')
		.pipe(babel())
		.pipe(gulp.dest('dist-es6-gulp'));
});

//----------------
// ekperiment - end
//----------------

//----------------
// ekperiment - Typescript
//----------------

gulp.task('ts', function () {
	var tsResult = gulp.src('./src/**/*.ts') // or tsProject.src()
		.pipe(tsProject());

	return tsResult.js.pipe(gulp.dest('dist2'));
	// return gulp.src('./src/es6/**/*.js')
	// 	.pipe(babel())
	// 	.pipe(gulp.dest('dist2'));
});

//----------------
// ekperiment - end
//----------------


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
	gulp.watch([paths.scripts, paths.templates], ['scripts:all']);
	gulp.watch(paths.styles, ['styles']);
});


gulp.task('watch-n-serve', ['default', 'watch', 'serve'], () => {

});

gulp.task('default', [
	'copy',
	'styles',
	'scripts:all'
]);