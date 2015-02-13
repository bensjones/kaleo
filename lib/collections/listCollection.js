listCollection = new Meteor.Collection('listCollection');

listCollection.attachSchema(new SimpleSchema({

	title: {
		type: String,
		optional: false
	},

	description: {
		type: String,
		optional: false
	}

}));