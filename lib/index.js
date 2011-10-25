var beanpole = require('beanpole'),
router = beanpole.router();     

require('colors')     


exports.start = function(configOrPath)
{       
	var cfg = {};
	
	if(typeof configOrPath == 'string')
	{
		cfg = { config: configOrPath };
	}                                  
	else
	{
		cfg = configOrPath;                    
	}     
	
	if(!cfg.port) cfg.port = process.env.PORT || 31337;                                   
	                   
	router.params({
		'sysalert.config': {
			'source': cfg.config
		}
	})
	
	
	require('./plugin').plugin(router, {
		port: cfg.port
	})
	
}