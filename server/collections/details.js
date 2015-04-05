//server/collections/details.js

Meteor.publish('details', function(parentId){
	var list = listCollection.findOne({_id: parentId});

	if(list.owner != this.userId){
		return this.ready();
	} else {
		return detailsCollection.find({parentId: parentId});
	}
});

Meteor.publish('sharedDetails', function(parentId){
	var list = listCollection.findOne({_id: parentId});	

	if(list.shared_user != this.userId){
		return this.ready();
	} else {
		return detailsCollection.find({parentId: parentId});
	}
});

