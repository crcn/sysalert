var fs = require('fs'),
ini = require('ini')


exports.plugin = function(router, params)
{   
	var endpoints = [];             
	
	
	router.on({
		           
		
		/**
		 */
		
		'push init': function()
		{
			endpoints.forEach(function(endpoint)
			{    
				router.push('alert/endpoint', endpoint)
			})
		},
		
		/**
		 */
		
		
		
	});
	
	
	var settingFactory = {

		endpoint: function(name, setting)
		{                    
			var dests = {};   
			
			for(var property in setting)
			{
				if(property.substr(0,5) == 'dest-')
				{        
					var destType = property.substr(5);
					                                              
					
					//e.g: iphone: ['999-999-9999','555-555-5555']
					dests[destType] = setting[property].split(/\s+/g);
				}
			}     
			
			endpoints.push({
				name: name,                  
				sendNotification: function(message)
				{  
					router.push('alert/notification', {      
						destinations: dests,
						message: message 
					});  
				}
			});                             
		},
		
		keys: function(service, setting)
		{                     
			console.log(service)
			console.log(setting)
		}
	}                                                                                            
            
	settings = ini.parse(fs.readFileSync(params.source || '/etc/sysalert.conf','utf8').replace(/;[^\n\r]+/g,''));

	for(var group in settings)
	{
		var groupParts = group.split(':'),
		fact = settingFactory[groupParts.shift()];
		
		if(!fact) continue;    

		fact(groupParts.shift(), settings[group]);
	}  
	
	
	
}