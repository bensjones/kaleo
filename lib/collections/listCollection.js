listCollection = new Meteor.Collection('listCollection');

Meteor.methods({
	addList: function(newList){
		if(! Meteor.userId()){
			throw new Meteor.Error('not-authorized');
		}

		listCollection.insert({
			title: newList.title,
			description: newList.description,
			dateCreated: newList.dateCreated,
			owner: newList.owner,
			shared_user: newList.shared_user
		});
	},

	deleteList: function(listId){
		listCollection.remove(listId);
		detailsCollection.remove({parentId: listId});
	},

	returnUsers: function(){
		return Meteor.users.find().fetch();
	}
});