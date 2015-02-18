//server/collections/details.js

Meteor.publish('details', function(parentId){
	console.log(parentId);
	return detailsCollection.find({parentId: parentId});
});