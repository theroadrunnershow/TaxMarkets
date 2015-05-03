
AutoForm.hooks({
	add: {
	    onSubmit: function (doc) {
	    	AutoForm.resetForm('add');
	    	this.done();
	    	return false;
	    },
	    onSuccess: function(doc, result) {
	    	Router.go('/createdprovider');
	    }
	  },
	  editf: {
		    onSubmit: function (doc) {
		    	AutoForm.resetForm('editf');
		    	this.done();
		    	return false;
		    },
		    onSuccess: function(doc, result) {
		    	Router.go('/createdprovider');
		    }
		  }	  
	});

Template.providerDetailsCreated.events = {
	'click #editbtn' : function(event) {
		event.preventDefault();
		Router.go('/serviceprovider');
	},
};

Template.createprovider.helpers({
	mapOptions : function() {
		var userLat = 37.4012125;
		var userLng = -122.10166;
		if (GoogleMaps.loaded()) {
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(function(position) {
					userLat = position.coords.latitude;
					userLng = position.coords.longitude;
				});
			}
			return {
				center : new google.maps.LatLng(Number(userLat),
						Number(userLng)),
				zoom : 10
			};
		}
	}
});

Template.createprovider.onCreated(function() {
	GoogleMaps.ready('gmap', function(map) {
		
		var marker = new google.maps.Marker({
			position : map.options.center,
			map : map.instance,
			title : "You are here. Please enter your address in the search box!"
		});
		// Build the input textbox for the searchbox in the map.
		var input = document.createElement("INPUT");
		// id ='pac-input' , class="controls", type="text",placeholder="Search Box"
		input.setAttribute("id", "pac-input");
		input.setAttribute("class", "controls");
		input.setAttribute("type", "text");
		input.setAttribute("placeholder", "Search Box");
		map.instance.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
		var searchBox = new google.maps.places.SearchBox(input);
		var updateDoc;
		try{
			updateDoc=AutoForm.getFormValues("editf").updateDoc;
			var latlong = AutoForm.getFieldValue("editf","officelocation").split(",");
			marker.setOptions({
				position : new google.maps.LatLng(Number(latlong[0]), 
						Number(latlong[1]) ),
				map : map.instance,
			});
			map.instance.setCenter(marker.getPosition());
			input.setAttribute("value", AutoForm.getFieldValue("editf","officeaddress"));
		}
		catch(err) {
		    //do nothing, we want this only for update doc.
		}

		// Bias SearchBox results towards places within the bounds of the current map's viewport.
		google.maps.event.addListener(map, 'bounds_changed', function() {
			searchBox.setBounds(map.getBounds());
		});

		google.maps.event.addListener(searchBox, 'places_changed', function() {
			var places = searchBox.getPlaces();
			if (places.length == 0) {
				return;
			}
			console.log(places[0]);
			// lat=geometry.location.k, long=geometry.location.D
			if(document.getElementsByName('officelocation') &&
					document.getElementsByName('officelocation').length>0){
				var x = document.getElementsByName('officelocation')
				x[0].value = 
					places[0].geometry.location.k + "," + places[0].geometry.location.D;
			}
			if(document.getElementsByName('officeaddress') &&
					document.getElementsByName('officeaddress').length>0){
				var y = document.getElementsByName('officeaddress')
				y[0].value = places[0].formatted_address;
			}
			var addressComponents = places[0].address_components;
			var componentTypes;
			for(var q=0; q<addressComponents.length; q++){
				componentTypes = addressComponents[q].types;
				for(var m=0; m<componentTypes.length; m++){
					if(componentTypes[m]==='country'){
						if(document.getElementsByName('country') &&
								document.getElementsByName('country').length>0){
							var x = document.getElementsByName('country')
							x[0].value = addressComponents[q].long_name;
						}
					}
					if(componentTypes[m]==='administrative_area_level_1'){
						console.log("state");
						console.log(addressComponents[q].long_name);
						if(document.getElementsByName('state') &&
								document.getElementsByName('state').length>0){
							var x = document.getElementsByName('state')
							x[0].value = addressComponents[q].long_name;
						}
					}
					if(componentTypes[m]==='locality'){
						if(document.getElementsByName('city') &&
								document.getElementsByName('city').length>0){
							var x = document.getElementsByName('city')
							x[0].value = addressComponents[q].long_name;
						}
					}
					if(componentTypes[m]==='postal_code'){
						if(document.getElementsByName('zip') &&
								document.getElementsByName('zip').length>0){
							var x = document.getElementsByName('zip')
							x[0].value = addressComponents[q].long_name;
						}
					}
				}
			}
			map.instance.setCenter(places[0].geometry.location);
			marker.setOptions({
				map: map.instance,
				position: places[0].geometry.location,
				title: places[0].formatted_address
			});
			map.instance.setOptions({
				center: marker.getPosition(),
				zoom: 12
			});
		});
	});
});

