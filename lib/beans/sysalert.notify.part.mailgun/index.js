var Mailgun = require('mailgun').Mailgun;

exports.plugin = function(router, params)
{                                                
	
	if(!params.key || !params.sender) return console.warn('Unable to setup mailgun - missing parameters');                                    
	                       
	var client = new Mailgun(params.key);
	
	
	router.on({         
		
		/**
		 */
		
		'push init': function()
		{
			router.push('alert/notifier', {
				type: 'email',
				sendNotification: function(contact, notification)
				{       
					var msg = 'Message: \n\n' + notification.message + '\n\n Details: ' + notification.details.description;                              
					                                
					
					console.log("Sending email notification: \n %s", msg.blue);
					
					client.sendText(params.sender, 
						contact, 
						'System alert: ' + notification.event, 
						msg, 
						function(err)
					{
						
					});
				}
			})
		}
		
	});
}