notificationsCollection = new Meteor.Collection('notificationCollection');

Meteor.methods({
	addNotification: function(newList){
		if(! Meteor.userId()){
			throw new Meteor.Error('not-authorized');
		}

		notificationsCollection.insert({
			listId: this._id,
			notified_user: newList.shared_user
		})
	},

	deleteNotification: function(notificationId){
		notificationsCollection.remove(notificationId);
	}
});