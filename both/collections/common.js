Schemas.contact = new SimpleSchema({
	name : {
		type : String,
		label : "Your name",
		max : 50,
		defaultValue : this.userId
		
	},
	email : {
		type : String,
		regEx : SimpleSchema.RegEx.Email,
		label : "E-mail address"
	},
	message : {
		type : String,
		label : "Message",
		max : 1000
	}
});

Schemas.search = new SimpleSchema({
	zipcode : {
		type : String,
		optional : true,
		autoform : {
			afFieldInput : {
				type : "number"
			}
		}
	},
	inputlocation : {
		type : String,
		label : 'Select Location',
		optional : true,
		autoform : {
			afFieldInput : {
				type: "map",
				geolocation: true,
				searchBox: true,
				autolocate: true,
				width: '0px',
				height: '0px'
			}
		}
	},
	speciality : {
		type : String,
		optional : true,
		autoform : {
			type : "select",
			options : function() {
				return [ {
					label : "Tax – Appeals and Representation",
					value : "Tax – Appeals and Representation"
				}, {
					label : "Tax – Business",
					value : "Tax – Business"
				}, {
					label : "Tax – Comprehensive",
					value : "Tax – Comprehensive"
				}, {
					label : "Tax – Consolidated Returns",
					value : "Tax – Consolidated Returns"
				}, {
					label : "Tax – Consulting",
					value : "Tax – Consulting"
				}, {
					label : "Tax – Corporate",
					value : "Tax – Corporate"
				}, {
					label : "Tax – Divorce",
					value : "Tax – Divorce"
				}, {
					label : "Tax – High Net Worth Individuals",
					value : "Tax – High Net Worth Individuals"
				}, {
					label : "Tax – Individuals",
					value : "Tax – Individuals"
				}, {
					label : "Tax – International",
					value : "Tax – International"
				}, {
					label : "Tax – Late/Back Year Taxes",
					value : "Tax – Late/Back Year Taxes"
				}, {
					label : "Tax – LLC/LLP",
					value : "Tax – LLC/LLP"
				}, {
					label : "Tax – Multi-State Returns",
					value : "Tax – Multi-State Returns"
				}, {
					label : "Tax – Non-Resident/Foreign Returns",
					value : "Tax – Non-Resident/Foreign Returns"
				}, {
					label : "Tax – Offers in Compromise",
					value : "Tax – Offers in Compromise"
				}, {
					label : "Tax – Post Mortem Planning",
					value : "Tax – Post Mortem Planning"
				}, {
					label : "Tax – Real/Personal Property Taxes",
					value : "Tax – Real/Personal Property Taxes"
				}, {
					label : "Tax – Reorganizations",
					value : "Tax – Reorganizations"
				}, {
					label : "Tax – Sales Taxes",
					value : "Tax – Sales Taxes"
				}, {
					label : "Tax – Stock Options",
					value : "Tax – Stock Options"
				}, {
					label : "Tax – Value Added Tax (VAT)",
					value : "Tax – Value Added Tax (VAT)"
				}, {
					label : "Tax – Bankruptcy",
					value : "Tax – Bankruptcy"
				} ];
			}
		}
	},
	radius : {
		type : String,
		label : 'Within',
		optional : true,
		autoform : {
			type : "select",
			options : function() {
				return [ {
					label : "<5 Miles",
					value : 5
				}, {
					label : "<10 Miles",
					value : 10
				}, {
					label : "<20",
					value : 20
				}, {
					label : "<30",
					value : 30
				}];
			}
		}
	}
});