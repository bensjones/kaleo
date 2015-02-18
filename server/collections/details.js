//server/collections/details.js

Meteor.publish('details', function(parentId){
	if(this.userId){
		return detailsCollection.find({parentId: parentId});
	}
});