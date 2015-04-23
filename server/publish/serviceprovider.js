if (Meteor.isServer) {
Meteor.publish('serviceProviderByUserId', function() {  
  check(this.userId, String);

  return ServiceProviders.findOne({ owner: this.userId });
});

}