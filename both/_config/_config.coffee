@Config =
	name: 'Taxmarkets'
	title: 'Find Professional Tax Help. Fast.'
	subtitle: 'Dont wait till the tax season to plan your finances and taxes. Finding the right advisor and booking appointments with their office has never been easier.'
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
	dashboardRoute: '/serviceproviders'
	socialMedia:
		facebook:
			url: 'https://www.facebook.com/abhishek.sunku'
			icon: 'facebook'
		twitter:
			url: 'http://twitter.com/asunku'
			icon: 'twitter'
		contactus:
			url: '/contactForm'
			icon: 'link'
	publicRoutes: ['home']