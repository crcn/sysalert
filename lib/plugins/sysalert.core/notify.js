var structr = require('structr'),
async       = require("async")

var Notifier = structr({

	/**
	 */

	"__construct": function(collection, serviceType, endpoint)
	{
		this.collection  = collection;
		this.serviceType = serviceType;
		this.endpoint    = endpoint;
	},

	/**
 	 */

 	"notify": function(message, callback) {
 		var service = this.collection.controller.services[this.serviceType];
 		if(!service) return callback(new Error("service " + service + " does not exist"));
 		service.sendNotification(this.endpoint, message);
 		return callback(null, true);
 	}
})

var Collection = structr({

	/**
	 */

	"__construct": function(controller, name, description)
	{
		this.description = description;
		this.controller = controller;
		this.name       = name;
		this._notifiers = [];
	},

	/**
	 */

	"addNotifier": function(notifier) {
		this._notifiers.push(notifier);
	},

	/**
	 */

	"notify": function(details, callback) {

		var message = {
			event: this.name,
			message: this.description,
			details: details
		};


		async.forEach(this._notifiers, function(notifier, next) {
			notifier.notify(message, next);
		}, callback);
	}

});


module.exports = structr({

	/**
	 */

	"__construct": function(events, services) {
		this.services = services;
		this._events = {};
		this._parseEvents(events);
	},

	/**
     */

    "notify": function(event, message, callback) {
    	if(!this._events[event]) return callback(new Error("event " + event + " does not exist"));
    	this._events[event].notify(message, callback);
    },

    /**
     */

     "_parseEvents": function(events) {


     	for(var name in events) {



     		var event = events[name];
     		var collection = new Collection(this, name, event.description);

     		for(var notifyType in event.notify) {
     			var notify = event.notify[notifyType];
     			if(!(notify instanceof Array)) notify = [notify];

     			for(var i = notify.length; i--;) {
     				collection.addNotifier(new Notifier(collection, notifyType, notify[i]));
     			}
     		}

     		this._events[name] = collection;
     	}
     }
})