@Config =
	name: 'Taxmarkets'
	title: 'Find Professional Tax Help. Fast.'
	subtitle: 'A dedicated marketplace to find professional tax and financial advice near you.'
	logo: ->
		'<b>' + @name + '</b>'
	footer: ->
		@name + ' - Copyright ' + new Date().getFullYear()
	emails:
		from: 'noreply@' + Meteor.absoluteUrl()
	blog: 'http://meteorfactory.io'
	about: 'http://meteorfactory.io'
	username: false
	homeRoute: '/'
	dashboardRoute: '/dashboard'
	socialMedia:
		facebook:
			url: 'http://facebook.com/benjaminpeterjones'
			icon: 'facebook'
		twitter:
			url: 'http://twitter.com/BenPeterJones'
			icon: 'twitter'
		github:
			url: 'http://github.com/yogiben'
			icon: 'github'
		info:
			url: 'http://meteorfactory.io'
			icon: 'link'
	publicRoutes: ['home']