
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
			var lat = (ServiceProviderSearch.getMetadata().searchCenterCoords)[1];
			var lng = (ServiceProviderSearch.getMetadata().searchCenterCoords)[0];
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
			
			ServiceProviderSearch.search('',options);
			//createGMap(options.userLat, options.userLng);
		},
		function(error) {
			// Handle non-supported clients?
		});
		}
	
};

Template.searchBox.events({
	"submit #searchForm": function() {
		if (AutoForm.validateForm('searchForm')) {
			//get values from user search form.
			var e = document.getElementById("specialityDropdown");
			var specialityText = e.options[e.selectedIndex].text;
			
			options.zipcode = document.getElementById("zipcode").value;
			
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

buildDirectionLink = function(fLat, fLng, tLat, tLng){
	return "https://www.google.com/maps/dir/"+ fLat + fLng +"/" + tLat + tLng;
}
