ServiceProviders = new Mongo.Collection('serviceproviders');

LocationSchema = new SimpleSchema({
	  type : {
	    type : String,
	    defaultValue: "Point"
	  },
	  coordinates: {
	    type: [Number],
	    decimal: true,
	    autoValue: function(){
	    	var locStrArray = this.field('officelocation').value.split(",");
	    	console.log("locStrArray "+locStrArray);
	    	return [Number(locStrArray[1]), Number(locStrArray[0])];
	    }
	  }
	});

Schemas.ServiceProviders = new SimpleSchema({
  email: {
    type: String,
    label: 'Email Address',
    autoValue: function() {
      if (this.isInsert || this.isUpdate) {
        return Meteor.user().emails[0].address;
      }
    },
    autoform: {
      afFieldInput: {
        type: 'email'
      }
    }
  },
  officelocation: {
    type: String,
    label: 'Location of Office',
    defaultValue: "0,0"
  },
  city: {
	  type: String,
	  optional: true
  },
  state: {
	  type: String,
	  optional: true
  },
  country: {
	  type: String,
	  optional: true
  },
  zip: {
	  type: String,
	  optional: true
  },
  certifiedBool: {
	  type: String,
	  label: 'Certified and Searchable?',
	  defaultValue: "0"
  },
  location: {
    type: LocationSchema,
    optional: true
  },
  officeaddress: {
    type: String,
    label: 'Address as shown in your profile'
  },
  createdAt: {
    type: Date,
    autoValue: function() {
      if (this.isInsert) {
        return new Date();
      }
    }
  },
  updatedAt: {
    type: Date,
    autoValue: function() {
      if (this.isInsert || this.isUpdate) {
        return new Date();
      }
    }
  },
  businessname: {
    type: String,
    label: 'Name of Business/Company'
  },
  contactname: {
    type: String,
    label: 'Contact Full Name'
  },
  tin: {
    type: String,
    label: 'TIN Number'
  },
  specialities: {
    type: [String],
    optional: true,
    label: 'Specializations',
    autoform: {
      afFieldInput: {
        type: 'select-multiple',
        options: function() {
          return [
            {
              label: "Tax – Appeals and Representation",
              value: "Tax – Appeals and Representation"
            }, {
              label: "Tax – Business",
              value: "Tax – Business"
            }, {
              label: "Tax – Comprehensive",
              value: "Tax – Comprehensive"
            }, {
              label: "Tax – Consolidated Returns",
              value: "Tax – Consolidated Returns"
            }, {
              label: "Tax – Consulting",
              value: "Tax – Consulting"
            }, {
              label: "Tax – Corporate",
              value: "Tax – Corporate"
            }, {
              label: "Tax – Divorce",
              value: "Tax – Divorce"
            }, {
              label: "Tax – High Net Worth Individuals",
              value: "Tax – High Net Worth Individuals"
            }, {
              label: "Tax – Individuals",
              value: "Tax – Individuals"
            }, {
              label: "Tax – International",
              value: "Tax – International"
            }, {
              label: "Tax – Late/Back Year Taxes",
              value: "Tax – Late/Back Year Taxes"
            }, {
              label: "Tax – LLC/LLP",
              value: "Tax – LLC/LLP"
            }, {
              label: "Tax – Multi-State Returns",
              value: "Tax – Multi-State Returns"
            }, {
              label: "Tax – Non-Resident/Foreign Returns",
              value: "Tax – Non-Resident/Foreign Returns"
            }, {
              label: "Tax – Offers in Compromise",
              value: "Tax – Offers in Compromise"
            }, {
              label: "Tax – Post Mortem Planning",
              value: "Tax – Post Mortem Planning"
            }, {
              label: "Tax – Real/Personal Property Taxes",
              value: "Tax – Real/Personal Property Taxes"
            }, {
              label: "Tax – Reorganizations",
              value: "Tax – Reorganizations"
            }, {
              label: "Tax – Sales Taxes",
              value: "Tax – Sales Taxes"
            }, {
              label: "Tax – Stock Options",
              value: "Tax – Stock Options"
            }, {
              label: "Tax – Value Added Tax (VAT)",
              value: "Tax – Value Added Tax (VAT)"
            }, {
              label: "Tax – Bankruptcy",
              value: "Tax – Bankruptcy"
            }
          ];
        }
      }
    }
  },
  businessdesc: {
    type: String,
    label: 'Short Description of your Company',
    autoform: {
      afFieldInput: {
        type: 'textarea'
      }
    }
  },
  phone: {
    type: Number,
    label: 'Contact Phone Number',
    autoform: {
      afFieldInput: {
        type: 'tel'
      }
    }
  },
  owner: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    autoValue: function() {
      if (this.isInsert) {
        return Meteor.userId();
      }
    },
    autoform: {
      options: function() {
        return _.map(Meteor.users.find().fetch(), function(user) {
          return {
            label: user.emails[0].address,
            value: user._id
          };
        });
      }
    }
  }
});

ServiceProviders.attachSchema(Schemas.ServiceProviders);
