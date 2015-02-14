detailsCollection = new Meteor.Collection('deatailsCollection');

detailsCollection.attachSchema(new SimpleSchema({

	items: {
		type: String
	},

	guests: {
		type: String
	},

	occasion: {
		type: String
	}

}));