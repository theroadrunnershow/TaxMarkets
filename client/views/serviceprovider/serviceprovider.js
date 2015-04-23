Template.createprovider.events = {
	'submit .add' : function(e) {
		event.preventDefault();
		if (AutoForm.validateForm('add')) {
			Router.go('/createdprovider');
		}
		AutoForm.resetForm('add');
	},
	'submit .editf' : function(e) {
		event.preventDefault();
		Router.go('/createdprovider');
		AutoForm.resetForm('editf');
	}
};

Template.providerDetailsCreated.events = {
	'click #editbtn' : function(event) {
		event.preventDefault();
		Router.go('/serviceprovider');
	},
};

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

Template.searchResult.rendered = function() {
	ServiceProviderSearch.search('',options);
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
					ServiceProviderSearch.search(specialityText,options);
				    // Not going to user location if not available.
				    // error.code can be:
				    //   0: unknown error
				    //   1: permission denied
				    //   2: position unavailable (error response from locaton provider)
				    //   3: timed out
				  });
				}
				else {
					//Geolocation is not supported for this Browser/OS version yet. Not setting user location
					ServiceProviderSearch.search(specialityText,options);
				}
		}
	}
});