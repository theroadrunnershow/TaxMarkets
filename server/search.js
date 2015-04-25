SearchSource.defineSource('serviceproviders', function(chosenSpeciality, options) {
	
	ServiceProviders._ensureIndex({ "location": "2dsphere", "specialities":1});

	console.log("SearchSource.defineSource options.radius " + options.radius);
	console.log("SearchSource.defineSource options.zipcode " + options.zipcode);
	console.log("SearchSource.defineSource options.userLat " + options.userLat);
	console.log("SearchSource.defineSource options.userLng " + options.userLng);
	console.log("SearchSource.defineSource options.maxRecords " + options.maxRecords);
	
	if(options.radius === undefined || options.radius == null 
			|| options.radius.length <= 0){
		options.radius = 50; //miles
	}
	if(isNaN(Number(options.radius)) ? false : true){
		options.radius = 50; //miles
	}
	
	if((options.zipcode === undefined || options.zipcode == null 
			|| options.zipcode.length <= 0)? false : true){
		// get the lat long from zip code is user has provided
		HTTP.call("get","https://maps.googleapis.com/maps/api/geocode/json?address="+options.zipcode +"&key=AIzaSyD_a9DwOndfi4_5pyOAKcn0xIT-FqCHT_I", 
				function(error, result) {
			if(error){
				console.log('Reverse Geocoding Failed because: '+error.reason);
			}
			options.userLat = result.data.results[0].geometry.location.lat;
			options.userLng = result.data.results[0].geometry.location.lng;
			console.log("User entered zipcode coords =" + officeLocationFormattedAddress);
		});	
	} 
	// If user HTML5 location fails, location will not be used to search providers.
	// What are the options to sort by closest?
	
	var queryOptions = {sort: {updatedAt: -1}, limit: 100};

	if(chosenSpeciality) {
		var chosenSpecialityArray = [];
		chosenSpecialityArray.push(chosenSpeciality);
		var selector = { "specialities": { $in: chosenSpecialityArray } };
		var foundProviders = ServiceProviders.find(selector, queryOptions).fetch();

		for(var i=0; i<foundProviders.length; i++){
			if((foundProviders[i].location === undefined || 
					foundProviders[i].location == null || 
					foundProviders[i].location.length <= 0)? false : true){
				var lat = (foundProviders[i].location.split(','))[0];
				var lng = (foundProviders[i].location.split(','))[1];
				console.log("foundProviders location provider"+i+" lat " +lat+" lng " +lng);
			} else{
				console.log("foundProviders empty location" );
			}
		}
		
		return foundProviders;
	} else {
		return ServiceProviders.find({}, queryOptions).fetch();
	}
});
