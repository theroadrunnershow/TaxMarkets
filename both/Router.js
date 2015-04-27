Router.configure({
	layoutTemplate: "masterLayout",
	loadingTemplate: "loading",
	notFoundTemplate: "notFound",
	routeControllerNameConverter: "camelCase",
});


Router.map(function() {
	this.route('home',{
	    path: "/",
	    layoutTemplate: "homeLayout",	
	});
	this.route('serviceprovider', {
		path: "/serviceprovider",	
	    data: {
	    		selectedProvider: function () {
	    			return ServiceProviders.findOne({ owner: Meteor.userId() });}
		    },
	    waitOn: function() {
	        return Meteor.subscribe('serviceproviders');
	      }
	});	
	this.route('profile',{
	    path: "/profile",	
	});	
	this.route('contactForm',{
	    path: "/contactForm",	
	});	
	this.route('account',{
	    path: "/account",	
	});	
	this.route('about');
	this.route('createdprovider', {
		data: function() { return ServiceProviders.findOne({ owner: Meteor.userId() }); },
	    waitOn: function() {
	        return Meteor.subscribe('serviceproviders');
	      }
	});
	this.route('serviceproviders', {
		onBeforeAction: function () {
		    if (Session.get("serviceproviderBtnClickedBoolean")) {
		    	Router.go("/serviceprovider");
		    }
		    this.next();
		  }
	});
}
);

var publicRoutes, saveRedirectUrl, signInProhibited, signInRequired;

signInRequired = function() {
  AccountsEntry.signInRequired(this);
  if (this.next) {
    return this.next();
  }
};

saveRedirectUrl = function() {
  if (!Meteor.loggingIn()) {
    if (!Meteor.user()) {
      Session.set('redirectToAfterSignIn', this.url);
    }
  }
  return this.next();
};

publicRoutes = _.union(Config.publicRoutes, ['serviceproviders','entrySignIn', 'entrySignUp', 'entryForgotPassword','contactForm']);

Router.onBeforeAction(saveRedirectUrl, {
  except: _.union(publicRoutes, ['entrySignOut'])
});

Router.onBeforeAction(signInRequired, {
  except: publicRoutes
});

signInProhibited = function() {
  if (Meteor.user()) {  
    return Router.go('serviceproviders');
  } else {
    if (this.next) {
      return this.next();
    }
  }
};

Router.onBeforeAction(signInProhibited, {
  only: ['entrySignUp', 'entrySignUp', 'entryForgotPassword']
});

Router.onBeforeAction(function() {
	if (GoogleMaps.loaded()?false:true) {
		GoogleMaps.load();
		}
	  this.next();
	}, { only: ['serviceproviders'] });

