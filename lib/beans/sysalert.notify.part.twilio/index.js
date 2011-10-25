var os = require('os'),
twilio = require('twilio'),
sys = require('sys');

exports.plugin = function(router, params)
{   
	var client = new twilio.Client(params.sid, params.token, params.hostname),
	phone = client.getPhoneNumber(params.phoneNumber);       
	
	
	phone.setup();
	    
	
	router.on({
		
		/**
		 */
		
		'push init': function()
		{      
			
			//SMS
			router.push('alert/notifier', {
				type: 'sms',
				sendNotification: function(phoneNumber, notification)
				{                                
					console.log('Sending SMS message: "%s"', notification.message);
					
					phone.sendSms(phoneNumber, notification.message, null, function(sms)
					{
						sms.on('processed', function(reqParams, response)
						{
							console.log('Message processed')
						});
					});
				}
			});
			
			  
			//voice
			router.push('alert/notifier', {
				type: 'voice',
				sendNotification: function(phoneNumber, notification)
				{                                
					console.log('Sending voice message: "%s"', notification.message);
					        
					phone.makeCall(phoneNumber, null, function(call)
					{  
						call.on('answered', function(reqParams, res)
						{   
							console.log('Call answered');
							    
							     
							//give some time for the user to put the phone up to the ear
							setTimeout(function()
							{
								res.append(new twilio.Twiml.Say(notification.message));
								res.send();
							}, 1500);
						});
					});
				}
			});
			
			
		}
	});    
	
}