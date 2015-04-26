
var options = {
		  keepHistory: 1000 * 60 * 5,
		  localSearch: true,
		  radius: 50,
		  maxRecords: 100
		};

var fields = ['specialities'];
ServiceProviderSearch = new SearchSource('serviceproviders', fields, options);

Template.searchResult.helpers({
	getServiceProviders: function() {
		return ServiceProviderSearch.getData();
	},
	isLoading: function() {
		return ServiceProviderSearch.getStatus().loading;
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

Template.searchResult.rendered = function() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			options.userLat = position.coords.latitude;
			options.userLng = position.coords.longitude;
			
			ServiceProviderSearch.search('',options);
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