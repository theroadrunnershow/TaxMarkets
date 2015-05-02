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
	dashboardRoute: '/'
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