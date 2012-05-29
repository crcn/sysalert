exports.plugin = function(router)
{                               
	
	router.on({
		
		'push init': function()
		{
			
			router.push('alert/source', {
				
				name: 'alertbird',
				
				parseMessage: function(data, callback)
				{
					//id, description, event, last_change_state, threshold
					
					callback(null, {    
						id: data.id,
						event: data.event
						// description: data.description
					})
				}
			})
		}
	})
	
}