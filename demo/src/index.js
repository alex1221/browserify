require('./lib/jquery');

var app = function(){

};

var appFn = app.prototype;


[
	require('./component')
].forEach( function(props){
	$.extend(true, appFn, props);
})

module.exports = app;