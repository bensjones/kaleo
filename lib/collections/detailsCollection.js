detailsCollection = new Meteor.Collection('deatailsCollection');

Meteor.methods({
	addDetail: function(detailFormData){
		if(! Meteor.userId()){
			throw new Meteor.Error('not-authorized');
		}

		detailsCollection.insert({
			detail: detailFormData.detail,
			parentId: detailFormData.parentId  
		});

	},

	deleteDetail: function(detailId){
		detailsCollection.remove(detailId);
	}
});