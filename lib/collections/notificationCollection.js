notificationsCollection = new Meteor.Collection('notificationCollection');

Meteor.methods({
	addNotification: function(newList){
		if(! Meteor.userId()){
			throw new Meteor.Error('not-authorized');
		}

		notificationsCollection.insert({
			notified_user: newList.shared_user,
			notified_user_email: newList.shared_user_email,
			owner: newList.owner,
			owner_email: newList.owner_email,
			list_title: newList.title
		})
	},

	deleteNotification: function(notificationId){
		notificationsCollection.remove(notificationId);
	}
});