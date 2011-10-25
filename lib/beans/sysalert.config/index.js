var fs = require('fs'),
ini = require('ini')


exports.plugin = function(router, params)
{   
	var eventListeners = [],
	basicAuth;            
	
	
	router.on({
		           
		
		/**
		 */
		
		'push init': function()
		{
			eventListeners.forEach(function(eventListener)
			{    
				router.push('alert/event/listener', eventListener)
			});      
			         
			   
			
			if(basicAuth) router.push('sysalert/auth', basicAuth);
			
			
		},
		
		/**
		 */
		
		
		
	});
	
	
	var settingFactory = {
                   
		auth: function(name, setting)
		{
			basicAuth = setting;
		},
		
		 
		/**
		 */
		
		event: function(name, setting)
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
			                        
			
			eventListeners.push({
				name: name,                  
				sendNotification: function(details)
				{  
					router.push('alert/notification', {      
						
						//destinations: emails, and phone numbers
						destinations: dests,    
						
						//short message to send
						message: setting.message,
						
						//details of the particular notification
						details: details 
					});  
				}
			});                             
		}, 
		
		/**
		 */
		
		keys: function(service, setting)
		{                              
			var params = {};
			params[service.replace(/_/g,'.')] = setting;
			                      
			
			router.params(params);   
			                                 
		}
	}                                                                                            
            
	settings = ini.parse(fs.readFileSync(params.source || '/etc/sysalert.conf','utf8').replace(/;[^\n\r]+/g,''));

	for(var group in settings)
	{
		var groupParts = group.split(':'),
		fact = settingFactory[groupParts.shift()];
		
		if(!fact) continue;    

		fact(groupParts.length ? groupParts.shift() : null, settings[group]);
	}  
	
	
	
}