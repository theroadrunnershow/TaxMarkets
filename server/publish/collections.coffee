Meteor.publish 'posts', ->
	Posts.find()

Meteor.publish 'attachments', ->
	Attachments.find()

Meteor.publish 'serviceproviders', ->
	ServiceProviders.find()