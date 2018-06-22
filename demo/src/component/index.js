var componentFn = {};

[
	require('./button')
].forEach( function( props ) {
	$.extend( true, componentFn, props )
});

module.exports = componentFn;