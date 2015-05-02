SearchSource.defineSource('serviceproviders', function(chosenSpeciality, options) {
	//Make sure that a search Index for location and speciality exists. Needed for geospatial search
	ServiceProviders._ensureIndex({ "location": "2dsphere", "specialities":1});
	
	if(options.radius === undefined || options.radius == null 
			|| options.radius.length <= 0){
		options.radius = 50; //miles
	}
	if(isNaN(Number(options.radius)) ? false : true){
		options.radius = 50; //miles
	}
	
	if(options.zipcode !== undefined && options.zipcode !== null 
			&& options.zipcode.length >0){
		// get the lat long from zip code is user has provided
		HTTP.call("get","https://maps.googleapis.com/maps/api/geocode/json?address="+options.zipcode +"&key=AIzaSyD_a9DwOndfi4_5pyOAKcn0xIT-FqCHT_I", 
				function(error, result) {
			if(error){
				console.log('Reverse Geocoding Failed because: '+error.reason);
			}
			options.userLat = result.data.results[0].geometry.location.lat;
			options.userLng = result.data.results[0].geometry.location.lng;
		});	
	} 
	// If user HTML5 location fails, location will not be used to search providers.
	// What are the options to sort by closest?
	
	var queryOptions = {sort: {updatedAt: -1}, limit: 100};
	console.log("SearchSource.defineSource options.radius " + options.radius);
	console.log("SearchSource.defineSource options.zipcode " + options.zipcode);
	console.log("SearchSource.defineSource options.userLat " + options.userLat);
	console.log("SearchSource.defineSource options.userLng " + options.userLng);
	console.log("SearchSource.defineSource options.maxRecords " + options.maxRecords);
	
	if(chosenSpeciality) {
		var chosenSpecialityArray = [];
		chosenSpecialityArray.push(chosenSpeciality);
		var selector = { "specialities": { $in: chosenSpecialityArray }, "certifiedBool": "0"};
		//var foundProviders = ServiceProviders.find(selector, queryOptions).fetch();
		
		var foundProviders = ServiceProviders.aggregate(
				[{ $geoNear: { 
					near: {type: 'Point', coordinates: [Number(options.userLng),Number(options.userLat) ]}, 
					distanceMultiplier:0.001, 
					distanceField: 'distance', 
					spherical: true,
					query: selector
					//maxDistance: options.radius
					} 
				}
				]);
		// returns distance in Km

		for(var i=0; i<foundProviders.length; i++){
			if((foundProviders[i].location === undefined || 
					foundProviders[i].location == null)? false : true){
				console.log("foundProviders location provider"+i+" lat " +foundProviders[i].location.coordinates[0]+" lng " +foundProviders[i].location.coordinates[1]);
			} else{
				console.log("foundProviders empty location" );
			}
		}
		var metadata={
				returnedProviderCount:foundProviders.length,
				searchCenterCoords:[Number(options.userLng),Number(options.userLat) ]
		};
		return {
			data: foundProviders,
			metadata: metadata
		};
	} else {
		var foundProviders = ServiceProviders.aggregate(
				[{ $geoNear: { 
					near: {type: 'Point', coordinates: [Number(options.userLng),Number(options.userLat) ]}, 
					distanceMultiplier:0.001, 
					distanceField: 'distance', 
					spherical: true,
					maxDistance: 100000
					} 
				}
				]);
		var metadata={
				returnedProviderCount:foundProviders.length,
				searchCenterCoords:[Number(options.userLng),Number(options.userLat) ]
		};
		return {
			data: foundProviders,
			metadata: metadata
		};;
	}
});
