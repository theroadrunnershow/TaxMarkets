Meteor.methods({
	UpdateAddressAndLocation : function(userId, doc) {
		if((doc.officeaddress === undefined || doc.officeaddress == null || doc.officeaddress.length <= 0) ? true : false){
		  HTTP.call("get",
					"https://maps.googleapis.com/maps/api/geocode/json?latlng="
					+ doc.officelocation+"&key=AIzaSyD_a9DwOndfi4_5pyOAKcn0xIT-FqCHT_I", function(error, result) {
				if(error){
					console.log('Reverse Geocoding Failed because: '+error.reason);
				} 	
			  	var officeLocationFormattedAddress = result.data.results[0].formatted_address;
			  	//Update city, state, zip and country to enable easier searches
				ServiceProviders.direct.update({_id: doc._id}, {$set: {officeaddress:officeLocationFormattedAddress }});
			});	
		}
		if((doc.officelocation === undefined || doc.officelocation == null || doc.officelocation.length <= 0) ? true : false){
			  HTTP.call("get",
						"https://maps.googleapis.com/maps/api/geocode/json?address="+doc.officeaddress+"&key=AIzaSyD_a9DwOndfi4_5pyOAKcn0xIT-FqCHT_I", function(error, result) {
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
	var coords=[];
	coords.push(Number((doc.officelocation.split(","))[1]));
	coords.push(Number((doc.officelocation.split(","))[0]));
	doc.location = {
			type:"Point",
			coordinates: coords};
});

/* Pass everything in the UI since the maps/places API provides everything in the client.
ServiceProviders.after.insert(function (userId, doc) {
	Meteor.call('UpdateAddressAndLocation', userId, doc);
});
*/
