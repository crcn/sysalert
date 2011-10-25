var vine = require('vine')

exports.plugin = function(router)
{   
	var sources = {},
	eventListeners = {},
	basicAuth;               
	
	
	router.on({
		
		/**
		 */
		
		'pull sysalert/auth': function(request)
		{                            
			if(!basicAuth)
			{                          
				request.next();
				return;
			}                          
			
			request.thru('basic/auth/' + basicAuth.username + '/' + basicAuth.password);
		},
		
		/**
		 */
		
		'pull -api -method=GET sysalert/auth -> /alert/:source/:event': function(request)
		{   
			var source, eventListener;     
			                                                                          
			if(!(source = sources[request.data.source])) return vine.error('Source does not exist');
			if(!(eventListener = eventListeners[request.data.event])) return vine.error('Event listener does not exist');           
			    
			
			//parse the message from the source so it's the same across *all* sources 
			source.parseMessage(request.data, function(message)
			{                            
				
				//send the notification to the event listener
				eventListener.sendNotification(message);   
				                               
				
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
		
		
		'push alert/event/listener': function(eventListener)
		{
			eventListeners[eventListener.name] = eventListener;        
		},
		
		/**
		 */
		
		'push sysalert/auth': function(auth)
		{                                
			basicAuth = auth;  
		}
	});
}