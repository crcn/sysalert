exports.plugin = function(router)
{   
	var notifiers = {};  
	
	
	router.on({
		
		/**
		 */
		
		'push alert/notifier': function(notifier)
		{
			notifiers[notifier.type] = notifier;
		},
		
		/**
		 */
		
		'push alert/notification': function(notification)
		{                            
			//destinations ~ iphone, email, etc, fax, etc.
			var dests = notification.destinations,        
			
			//the message to send as a notification
			message = notification.message;


			for(var type in dests)
			{
				var notifier = notifiers[type];
				
				
				if(!notifier)
				{
					console.warn('Notifier %s does not exist', type);
				}                                                    
				      
				//contacts are email addresses, phone numbers, etc.                    
				var contacts = dests[type];
				
				
				for(var i = contacts.length; i--;)
				{    
					notifier.sendNotification(contacts[i], message);
				}                                    
			}

		}
	});
}