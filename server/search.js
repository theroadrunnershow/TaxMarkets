SearchSource.defineSource('serviceproviders', function(chosenSpeciality, options) {

	console.log("SearchSource.defineSource options.radius " + options.radius);
	console.log("SearchSource.defineSource options.zipcode " + options.zipcode);
	console.log("SearchSource.defineSource options.userLat " + options.userLat);
	console.log("SearchSource.defineSource options.userLng " + options.userLng);
	console.log("SearchSource.defineSource options.maxRecords " + options.maxRecords);
	
	if((options.radius === undefined || options.radius == null 
			|| options.radius.length <= 0)? false : true){
		if(isNaN(Number(options.radius)) ? false : true){
			// Do stuff if user provides a max radius.
		}
	}
	if((options.zipcode === undefined || options.zipcode == null 
			|| options.zipcode.length <= 0)? false : true){
		// Do stuff if user provides a zipcode.
	}
	if((options.userLat === undefined || options.userLat == null || options.userLat.length <= 0
			|| options.userLng === undefined || options.userLng == null 
			|| options.userLng.length <= 0)? false : true){
		if(isNaN(Number(options.userLat)) && isNaN(Number(options.userLng)) ? false : true){
			// Do stuff if user current location's lat and long are there in the request
		}
	}
	
	var queryOptions = {sort: {updatedAt: -1}, limit: 100};

	if(chosenSpeciality) {
		var chosenSpecialityArray = [];
		chosenSpecialityArray.push(chosenSpeciality);
		var selector = { "specialities": { $in: chosenSpecialityArray } };
		var foundProviders = ServiceProviders.find(selector, queryOptions).fetch();

		for(var i=0; i<foundProviders.length; i++){
			console.log("foundProviders location provider"+i+"  " +foundProviders[i].location );
			if((foundProviders[i].location === undefined || foundProviders[i].location == null || foundProviders[i].location.length <= 0)? false : true){
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
