Meteor.publish('posts', function() {
  return Posts.find();
});

Meteor.publish('attachments', function() {
  return Attachments.find();
});

Meteor.publish('serviceproviders', function(userId) {
	return ServiceProviders.find({owner: userId}, {sort: {createdAt: 1}, limit: 1});
	});


