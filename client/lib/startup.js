Meteor.startup(function () {
    	GoogleMaps.load({ v: '3', key: 'AIzaSyD_a9DwOndfi4_5pyOAKcn0xIT-FqCHT_I', libraries: 'geometry,places' });
    	Meteor.Loader.loadCss('http://fonts.googleapis.com/css?family=Montserrat');
    	
    });
