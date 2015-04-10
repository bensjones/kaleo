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
			owner_email: newList.owner_email,
			shared_user: newList.shared_user,
			shared_user_email: newList.shared_user_email
		});

	},

	deleteList: function(listId){
		listCollection.remove(listId);
		detailsCollection.remove({parentId: listId});
	}
});
