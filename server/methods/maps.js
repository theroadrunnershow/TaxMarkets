Meteor.methods({
	UpdateAddressAndLocation : function(userId, doc) {
		if((doc.officeaddress === undefined || doc.officeaddress == null || doc.officeaddress.length <= 0) ? true : false){
		  HTTP.call("get",
					"https://maps.googleapis.com/maps/api/geocode/json?latlng="
					+ doc.location, function(error, result) {
				if(error){
					console.log('Reverse Geocoding Failed because: '+error.reason);
				}
			  	var officeLocationFormattedAddress = '';
				officeLocationFormattedAddress = result.data.results[0].formatted_address;
				ServiceProviders.update({_id: doc._id}, {$set: {officeaddress:officeLocationFormattedAddress}});
				console.log("Updated address =" + officeLocationFormattedAddress);
			});	
		}
		if((doc.location === undefined || doc.location == null || doc.location.length <= 0) ? true : false){
			  HTTP.call("get",
						"https://maps.googleapis.com/maps/api/geocode/json?address="+doc.officeaddress, function(error, result) {
					if(error){
						console.log('Reverse Geocoding Failed because: '+error.reason);
					}
				  	var latlong = '';
				  	latlong = result.data.results[0].geometry.location.lat+','+result.data.results[0].geometry.location.lng;
					ServiceProviders.update({_id: doc._id}, {$set: {location:latlong}});
					console.log("Updated lat long =" + latlong);
				});	
			}
	}
});

ServiceProviders.after.insert(function (userId, doc) {
  console.log("Updating address for inserted ServiceProvider _id=" + doc._id + ", officeaddress="+doc.officeaddress + " , location="+doc.location);
  Meteor.call('UpdateAddressAndLocation', userId, doc);
});

ServiceProviders.after.update(function (userId, doc) {
	  console.log("Updating address for updated ServiceProvider _id=" + doc._id + ", officeaddress="+doc.officeaddress + " , location="+doc.location);
	  Meteor.call('UpdateAddressAndLocation', userId, doc);
	});
