Tracker.autorun ->
	#Accounts entry routing bug
	if Meteor.userId() and not _.isNull(Router.current()) and Router.current().route.name == 'entrySignIn'
		Router.go 'serviceproviders'

	if Meteor.userId() and not _.isNull(Router.current()) and Router.current().route.name == 'entrySignUp'
		Router.go 'serviceproviders'

	#Subscriptions
	Meteor.subscribe 'user'
	Meteor.subscribe 'users'
