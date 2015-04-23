Meteor.methods({
  sendEmail: function(doc) {
    // Important server-side check for security and data integrity
    check(doc, Schemas.contact);

    // Build the e-mail text
    var text = "Name: " + doc.name + "\n\n"
            + "Email: " + doc.email + "\n\n\n\n"
            + doc.message;

    this.unblock();
    // Send the e-mail
    Email.send({
        to: "taxmarkets@gmail.com",
        from: doc.email,
        subject: "Website Contact/Feedback Form - Message From " + doc.name,
        text: text
    });
  },
  searchQuery: function(doc) {
	  
  }
});