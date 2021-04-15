var gulp        = require('gulp');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var rename = require("gulp-rename");
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');

// Static server
gulp.task('server', function() {
	browserSync.init({
		server: {
			baseDir: "../ProjectBootstrap/"
		}
	});
});

gulp.task('styles', function(){
	return gulp.src("Sass/*.+(scss|sass)")
			.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
			.pipe(rename({
				prefix: "",
				suffix: ".min",
			  }))
			.pipe(autoprefixer({
				cascade: false
			  }))
			.pipe(cleanCSS({compatibility: 'ie8'}))
			.pipe(gulp.dest("css/"))
			.pipe(browserSync.stream());
});

gulp.task('watch', function(){

	gulp.watch("Sass/*.+(scss|sass)", gulp.parallel("styles"));
	gulp.watch("*.html").on("change", browserSync.reload);

});

gulp.task('default', gulp.parallel('watch', 'server', 'styles'));