Meteor.methods({
	UpdateAddressAndLocation : function(userId, doc) {
		if((doc.officeaddress === undefined || doc.officeaddress == null || doc.officeaddress.length <= 0) ? true : false){
		  HTTP.call("get",
					"https://maps.googleapis.com/maps/api/geocode/json?latlng="
					+ doc.officelocation, function(error, result) {
				if(error){
					console.log('Reverse Geocoding Failed because: '+error.reason);
				}
			  	
			  	var officeLocationFormattedAddress = result.data.results[0].formatted_address;
				ServiceProviders.update({_id: doc._id}, {$set: {officeaddress:officeLocationFormattedAddress }});
				console.log("Updated address =" + officeLocationFormattedAddress);
			});	
		}
		if((doc.officelocation === undefined || doc.officelocation == null || doc.officelocation.length <= 0) ? true : false){
			  HTTP.call("get",
						"https://maps.googleapis.com/maps/api/geocode/json?address="+doc.officeaddress, function(error, result) {
					if(error){
						console.log('Reverse Geocoding Failed because: '+error.reason);
					}
				  	var latlong = result.data.results[0].geometry.location.lat+','+result.data.results[0].geometry.location.lng;
				  	doc.officelocation=latlong;
				  	
				});	
			}
	}
});

ServiceProviders.before.insert(function (userId, doc) {
	doc.location = {
			type:"Point",
			coordinates: {
				lng:Number((doc.officelocation.split(","))[1]),
				lat:Number((doc.officelocation.split(","))[0])
			}};
});

ServiceProviders.after.insert(function (userId, doc) {
	Meteor.call('UpdateAddressAndLocation', userId, doc);
});

// Check if can remove.
ServiceProviders.before.update(function (userId, doc) {
	Meteor.call('UpdateAddressAndLocation', userId, doc);
});
