//server/collections/details.js

Meteor.publish('details', function(parentId){
	var list = listCollection.findOne({_id: parentId});

	if(list.owner != this.userId){
		return this.ready();
	} else {
		return detailsCollection.find({parentId: parentId});
	}
});

