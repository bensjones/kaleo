//server/collections/details.js

Meteor.publish('details', function(parentId){
	if(!this.userId){
		return this.ready();
	}
		return detailsCollection.find({parentId: parentId});
});