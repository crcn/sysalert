
 


exports.plugin = function(router, params)
{
	router.params({
	    "http.gateway": {
	        "http": {
	            "port": params.port
	        }                 
	    },
	});

	require('bean.http');
	require.paths.unshift(__dirname + '/beans');

	router.require('sysalert.config');   

	router.require(__dirname + '/../package.json');

	router.require(__dirname + '/beans');

	router.push('init');
}