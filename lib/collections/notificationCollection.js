notificationCollection = new Meteor.Collection('notificationCollection');

Meteor.methods({
	addNotification: function(shared_user_id){
		if(! Meteor.userId()){
			throw new Meteor.Error('not-authorized');
		}

		
	}
});