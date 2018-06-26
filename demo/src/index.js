window.$ = require('./lib/jquery');

var App = function(){

};

var appFn = app.prototype;

[
	require('./component')
].forEach( function(props){
	$.extend(true, appFn, props);
});

module.exports = App;