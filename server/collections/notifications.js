//server/collections/notifications.js

Meteor.publish('notifications', function(){
	if(!this.userId)
		return this.ready();
	else
		return notificationsCollection.find({notified_user: this.userId});
});