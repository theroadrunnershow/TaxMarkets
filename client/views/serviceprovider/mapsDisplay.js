Meteor.startup(function() {
		if (GoogleMaps.loaded()?false:true) {
			GoogleMaps.load();
		}
});