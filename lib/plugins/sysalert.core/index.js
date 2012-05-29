var vine = require('vine'),
NotifierEvents   = require("./notify");

exports.plugin = function(router) {

	var sources = {},
	notifiers = {},
	params = this.params(),
	basicAuth = params.auth,      
	events = new NotifierEvents(params.events, notifiers);
	
	
	router.on({
		
		/**
		 */
		
		'pull sysalert/auth': function(req, res) {                            
			if(!basicAuth) {                          
				request.next();
				return;
			}                          
			
			// request.thru('basic/auth/' + basicAuth.username + '/' + basicAuth.password);

			this.next();
		},
		
		/**
		 * incoming API notification
		 */
		
		'pull -method=GET sysalert/auth -> /alert/:source/:event': function(req, res) {   

			var source, notify;     
			                                                                          
			if(!(source = sources[req.params.source])) return vine.error('Source does not exist').end(res);
			
			//parse the message from the source so it's the same across *all* sources 
			source.parseMessage(req.query, res.success(function(details) {
                      
				
				events.notify(req.params.event, details, res.success(function() {
					vine.result('Notification successfuly sent').end(res);
				}));

				           
			}));
			            
		},
		
		/**
		 */
		
		'push alert/source': function(source) {                     
			sources[source.name] = source;
		},
		
		/**
		 */        
		
		
		'push alert/notifier': function(notifier) {
			notifiers[notifier.type] = notifier; 
		}
	});
}