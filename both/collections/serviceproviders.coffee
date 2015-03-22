@ServiceProviders = new Meteor.Collection('serviceproviders');

Schemas.ServiceProviders = new SimpleSchema
	email:
		type:String
		label:'Email Address'
		autoform:
			afFieldInput:
				type: 'email'

	password:
		type:String
		label:'Password'
		autoform:
			afFieldInput:
				type: 'password'

	createdAt: 
		type: Date
		autoValue: ->
			if this.isInsert
				new Date()

	updatedAt:
		type:Date
		optional:true
		autoValue: ->
			if this.isUpdate
				new Date()

	businessname:
		type:String
		label:'Name of Business/Company'
		
	contactname:
		type:String
		label:'Contact Full Name'

	address1:
		type:String
		label:'Address (Line 1)'
		
	address2:
		type:String
		label:'Address (Line 2)'
		optional: true
		
	city:
		type:String
		label:'City'
	
	state:
		type:String
		label:'State'
		
	country:
		type:String
		label:'Country'
		
	tin:
		type:String
		label:'TIN Number'
		optional: true
		
	specialities:
		type: [String]
		optional: true
		label:'Specializations'
		autoform:
			afFieldInput:
				type: 'select-multiple'
				options: ->
					[
          			  	{label: "Tax – Appeals and Representation", value: "Tax – Appeals and Representation"},
          				{label: "Tax – Business", value: "Tax – Business"},
          		  		{label: "Tax – Comprehensive", value: "Tax – Comprehensive"}
        	  		]
	
	businessdesc:
		type:String
		label:'Short Description of your Company'
		autoform:
			afFieldInput:
				type: 'textarea'
	
	phone:
		type:Number
		label:'Contact Phone Number'
		autoform:
			afFieldInput:
				type: 'tel'

	owner: 
		type: String
		regEx: SimpleSchema.RegEx.Id
		autoValue: ->
			if this.isInsert
				Meteor.userId()
		autoform:
			options: ->
				_.map Meteor.users.find().fetch(), (user)->
					label: user.emails[0].address
					value: user._id

ServiceProviders.attachSchema(Schemas.ServiceProviders)