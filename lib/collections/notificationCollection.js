notificationCollection = new Meteor.Collection('notificationCollection');

Meteor.methods({
	addNotification: function(newList){
		if(! Meteor.userId()){
			throw new Meteor.Error('not-authorized');
		}

		notificationCollection.insert({
			notified_user: newList.shared_user
		})
	}
});