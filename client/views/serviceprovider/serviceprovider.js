
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
