
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

Template.contactForm.events({
	  'click #submit-btn': function (event) {
		  Router.go("/home");
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