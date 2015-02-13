listCollection = new Meteor.Collection('listSchema');

listCollection.attachSchema(new SimpleSchema({

	title: {
		type: String,
		optional: false
	},

	description: {
		type: String,
		optional: false
	},

	dateCreated: {
		type: Date,
		autoValue: function(){
			return new Date();
		}
	}

}));