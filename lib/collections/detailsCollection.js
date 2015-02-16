detailsCollection = new Meteor.Collection('deatailsCollection');

detailsCollection.attachSchema(new SimpleSchema({

	items: {
		type: String,
		optional: false
	},

	guests: {
		type: String,
		optional: false
	},

	occasion: {
		type: String,
		optional: false
	}

}));