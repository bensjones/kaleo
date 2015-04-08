notificationsCollection = new Meteor.Collection('notificationCollection');

Meteor.methods({
	addNotification: function(newList){
		if(! Meteor.userId()){
			throw new Meteor.Error('not-authorized');
		}

		notificationsCollection.insert({
			notified_user: newList.shared_user
		})
	}
});