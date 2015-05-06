
var options = {
		  keepHistory: 1000 * 60 * 5,
		  localSearch: true,
		  radius: 50,
		  maxRecords: 100
		};

var fields = ['specialities'];
ServiceProviderSearch = new SearchSource('serviceproviders', fields, options);

Template.searchResult.helpers({
	getProviderCount: function() {
		return ServiceProviderSearch.getMetadata().returnedProviderCount;
	},
	getServiceProviders: function() {
		var pinColor = "66CCFF";
		var pinImage;
		GoogleMaps.ready('providerMap', function(map) {
			pinColor = "66CCFF";
		    pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor,
		        new google.maps.Size(21, 34),
		        new google.maps.Point(0,0),
		        new google.maps.Point(10, 34));
		});
		/*.getData() api accepts an object with options (and an optional argument to ask for a cursor 
		 * instead of a fetched array; see example below). Can use for pagination?
		 * reference: https://github.com/meteorhacks/search-source*/
		return ServiceProviderSearch.getData({
			// Build DIrections Link here and redirect to Maps on click.
			docTransform: function(doc) {
				GoogleMaps.ready('providerMap', function(map) {
					if(Number(doc.location.coordinates[1]) && Number(doc.location.coordinates[0])){
						var marker = new google.maps.Marker({
							position: new google.maps.LatLng(Number(doc.location.coordinates[1]), 
									Number(doc.location.coordinates[0]) ),
							map: map.instance,
							icon: pinImage
						});
						google.maps.event.addListener(marker, 'click', function() {
						    map.instance.setZoom(13);
						    map.instance.setCenter(marker.getPosition());
						  });
					}
				});
				return _.extend(doc, {
					mapDirectionsLink: function() {
						var link = "https://www.google.com/maps/@"+doc.officelocation+",15z";
						if(ServiceProviderSearch.getMetadata()){
							link = "https://www.google.com/maps/dir/"
								+ (ServiceProviderSearch.getMetadata().searchCenterCoords)[1] +
								"," + (ServiceProviderSearch.getMetadata().searchCenterCoords)[0]
								+ "/"+ doc.officelocation;
						}
						return link;
					}
				});
			}
		});
	},
	isLoading: function() {
		return ServiceProviderSearch.getStatus().loading;
	},
	mathRounderHelper: function(input){
		return Math.round(Number(input) * 100)/100;
	},
	providerMapOptions : function() {
		if (GoogleMaps.loaded() && ServiceProviderSearch.getMetadata()) {
			// Map initialization options
			// server is returning searchCenterCoords ie. longlat in meta data
			var lat = 0;
			var lng = 0;
			try{
				if(ServiceProviderSearch.getMetadata().searchCenterCoords) {
					lat = (ServiceProviderSearch.getMetadata().searchCenterCoords)[1];
					lng = (ServiceProviderSearch.getMetadata().searchCenterCoords)[0];
				} else {
					if (navigator.geolocation) {
						navigator.geolocation.getCurrentPosition(function(position) {
							lat=position.coords.latitude;
							lng=position.coords.longitude;
							
						});
						}
				}
			
			} catch(err) {
				lat=0;
				lng=0;
			}
			return {
				center : new google.maps.LatLng(Number(lat), Number(lng)),
				zoom : 10
			};
		}
	}
});

Template.searchMetaDataHead.helpers({
	getProviderCount: function() {
		return ServiceProviderSearch.getMetadata().returnedProviderCount;
	},
	isLoading: function() {
		return ServiceProviderSearch.getStatus().loading;
	},
	getQueryDetails: function() {
		if(ServiceProviderSearch.getCurrentQuery()!==null 
				&& ServiceProviderSearch.getCurrentQuery()!==undefined){
			return ServiceProviderSearch.getCurrentQuery();
		} else {
			return null;
		}
	}
});
Template.searchResult.onCreated(function() {
	  // We can use the `ready` callback to interact with the map API once the map is ready.
	  GoogleMaps.ready('providerMap', function(map) {
	    // Add a marker to the map once it's ready event.latLng.lat()
	    var marker = new google.maps.Marker({
	      position: map.options.center,
	      map: map.instance
	    });
	    google.maps.event.addListener(map, 'click', function() {
	    	map.panTo(new google.maps.LatLng(event.latLng.lat(), event.latLng.lng()));
	    	map.setCenter(new google.maps.LatLng(event.latLng.lat(), event.latLng.lng()));
	      });
	  });
	});

Template.searchResult.rendered = function() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			options.userLat = position.coords.latitude;
			options.userLng = position.coords.longitude;
			
			//ServiceProviderSearch.search('',options);
		},
		function(error) {
			// Handle non-supported clients?
		});
		}
	console.log("Router.current().params = "+ JSON.stringify(Router.current().params.query));
	console.log("Router.current().params = "+ (Router.current().params.query)?true:false);
	if(!AutoForm.validateForm("searchForm")){
		console.log("yes");
		
	}
};


Template.searchBox.events({
	"submit #searchForm": function() {
		event.preventDefault();
		if (AutoForm.validateForm('searchForm')) {
			//get values from user search form.
			var e = document.getElementById("specialityDropdown");
			var specialityText = e.options[e.selectedIndex].text;
			
			options.zipcode = document.getElementById("in-postalcode").value;
			
			var radiusDropdown = document.getElementById("radius");
			options.radius = radiusDropdown.options[radiusDropdown.selectedIndex].value;
			
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(function(position) {
					options.userLat = position.coords.latitude;
					options.userLng = position.coords.longitude;
					ServiceProviderSearch.search(specialityText,options);
				},
				function(error) {
					// Handle non-supported clients?
					//TODO Handle the error. 
				});
				}
		}
	}
});
Template.mainPageSearchTemplate.events({
	"submit #home-search-form" : function(event) {
		event.preventDefault();
		var specialityText="";
		// get values from user search form.
		try{
			var e = document.getElementById("specialityDropdown");
			specialityText = e.options[e.selectedIndex].text;
			if(specialityText === null || 
					specialityText === undefined || 
					specialityText.length === 0 ||
					specialityText === "What do you need help with?"){
				specialityText="";
			}
		} catch(err){
			specialityText="";
		}
		try{
			if(document.getElementById("specialityDropdown")){
				options.zipcode = document.getElementById("in-postalcode").value;
			}			
		} catch(err){
			zipcode=null;
		}
		try{
			var radiusDropdown = document.getElementById("radius");
			options.radius = radiusDropdown.options[radiusDropdown.selectedIndex].value;
			if(options.radius === null || options.radius === undefined || options.radius.length === 0){
				options.radius=100;
			}
		} catch(err){
			radius=100;
		}

		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
					function(position) {
						options.userLat = position.coords.latitude;
						options.userLng = position.coords.longitude;
						ServiceProviderSearch.search(specialityText, options);
					}, function(error) {
						//latlong not set.
						ServiceProviderSearch.search(specialityText, options);
					});
		}
		Router.go("/serviceproviders");
	}
});

buildDirectionLink = function(fLat, fLng, tLat, tLng){
	return "https://www.google.com/maps/dir/"+ fLat + fLng +"/" + tLat + tLng;
}
