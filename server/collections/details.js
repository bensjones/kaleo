//server/collections/details.js

Meteor.publish('details', function(){
	return detailsCollection.find();
});