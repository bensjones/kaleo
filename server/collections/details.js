//server/collections/details.js

Meteor.publish('details', function(parentId){
	return detailsCollection.find({parentId: parentId});
});