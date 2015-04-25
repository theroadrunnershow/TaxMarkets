Meteor.publish('posts', function() {
  return Posts.find();
});

Meteor.publish('attachments', function() {
  return Attachments.find();
});

Meteor.publish('serviceproviders', function() {
	return ServiceProviders.find();
	});


