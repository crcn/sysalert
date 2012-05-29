var Mailgun = require('mailgun').Mailgun;
var logger = require('winston').loggers.get('mailgun');
var sprintf = require("sprintf").sprintf;

exports.plugin = function(router)
{                                 
	var params = this.params().mailgun;               
	
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
					var msg = 'Message: \n\n' + notification.message;

					if(notification.details.description)
					msg += '\n\n Details: ' + notification.details.description;                              
					                                
					
					logger.info(sprintf("Sending email notification: \n %s", msg));
					
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