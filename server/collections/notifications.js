//server/collections/notifications.js

Meteor.publish('notifications', function(){
	if(!this.userId)
		return this.ready();
	else
		return notificationCollection.find({notified_user: this.userId});
});