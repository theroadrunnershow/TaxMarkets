// myapp.js

Template.home.events({
  'click #serviceproviderBtnClicked': function (event) {
	  event.preventDefault();
	  Session.set("serviceproviderBtnClickedBoolean", true);
	  Router.go("/serviceprovider");
  },
  'submit #submitSearch' : function(e) {
		if (AutoForm.validateForm('searchForm')) {
			Router.go('/createdprovider');
		}
	}
});

Template.contactForm.helpers({
	  contactFormSchema: function() {
	    return Schemas.contact;
	  }
	});

Template.searchBox.helpers({
	  searchSchema: function() {
	    return Schemas.search;
	  }
	});