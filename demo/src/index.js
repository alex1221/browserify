var $ = require('./lib/jquery'),
	component = require('./component');

var app = function(){

};

var appFn = app.prototype;

$.extend(true, appFn, component);

module.exports = app;