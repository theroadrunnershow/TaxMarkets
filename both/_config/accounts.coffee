Accounts.config
	sendVerificationEmail : true

if Meteor.isClient
	Meteor.startup ->
		if Config.username
			AccountsEntry.config
				homeRoute: '/'
				dashboardRoute: '/serviceproviders'
				profileRoute: 'profile'
				passwordSignupFields: 'USERNAME_AND_EMAIL'
		else
			AccountsEntry.config
				homeRoute: '/'
				dashboardRoute: '/serviceproviders'
				profileRoute: 'profile'
				passwordSignupFields: 'EMAIL_ONLY'