var browserify = require('browserify'),
    sourcestram = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    sourcebuffer = require('vinyl-source-buffer'),
    sourcemaps = require('gulp-sourcemaps'),
    notifier = require('node-notifier'),
    uglify = require('gulp-uglify'),
    size = require('gulp-size'),
    gulp = require('gulp'),

	paths = { sourceEntry: './src/index.js' },

	assign = function(a,b){
	 	if(b){ for( var i in b ){ a[i] = b[i]; }}
	 	return a;
	},

	logError = function(err){
	 	notifier.notify({
	 		title: "app.js",
	 		message: "Error: " + err.message
	 	})
	},

	browserifyOpts = {
		entries: [paths.sourceEntry],
		debug: true
	};

var getBrowserify = function(opts){

	var  defaultOpts = {
		file: "app.js",
		sourceMaps: true,
		minify: false,
		handleErrors: true,
		bundle: true
	};

	opts = assign(defaultOpts,opts);

	var b = opts.stream || browserify(browserifyOpts);

	if(opts.bundle){ 
		b = b.bundle(); 
	}

	if(opts.handleErrors){
		b = b.on('error', logError);
	}

	var pipe = function(fn){
		b = b.pipe(fn);
	};

	if(opts.file){
		pipe(sourcestram(opts.file));
		pipe(buffer());
	}

	pipe(sourcemaps.init({loadMaps: true}));

	var dest;
	if(opts.minify){
		dest = 'dist/';
		pipe(uglify({ mangle: true }));
	}else{
		dest = 'dev/';
	}

	if(opts.sourceMaps === true){
		pipe(sourcemaps.write());
	} else if(opts.sourceMaps){
		pipe(sourcemaps.write(opts.sourceMaps));
	}

	pipe(gulp.dest(dest));

	return b;
};	


gulp.task('app',function(){
	return getBrowserify();
});

gulp.task('app-min',function(){
	return getBrowserify({
		file: "app.min.js",
		preamble: true,
		minify: true
	});
});

gulp.task('default',['app']);