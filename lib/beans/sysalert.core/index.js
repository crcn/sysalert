var vine = require('vine')

exports.plugin = function(router)
{   
	var sources = {},
	endpoints = {};               
	
	
	router.on({
		
		/**
		 */
		
		'pull -api -method=GET /alert/:source/:endpoint': function(request)
		{   
			var source, endpoint;     
			                                                                          
			if(!(source = sources[request.data.source])) return vine.error('Source does not exist');
			if(!(source = endpoints[request.data.endpoint])) return vine.error('Endpoint does not exist');           
			    
			
			//parse the message from the source so it's the same across *all* sources 
			source.parseMessage(request.data, function(message)
			{                            
				
				//send the notification to the endpoint
				endpoint.sendNotification(message);   
				                               
				
				//success!
				return vine.result('Notification successfuly sent').end(request);
			});
			            
		},
		
		/**
		 */
		
		'push alert/source': function(source)
		{                     
			sources[source.name] = source;
		},
		
		/**
		 */        
		
		
		'push alert/endpoint': function(endpoint)
		{
			endpoints[endpoint.name] = endpoint;        
		}
	});
}