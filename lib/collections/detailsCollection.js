detailsCollection = new Meteor.Collection('deatailsCollection');

Meteor.methods({
	addDetail: function(newList){
		if(! Meteor.userId()){
			throw new Meteor.Error('not-authorized');
		}

		detailsCollection.insert({
			description: newList.detail
		});
	},

	deleteDetail: function(detailId){
		detailCollection.remove(detailId);
	}
});