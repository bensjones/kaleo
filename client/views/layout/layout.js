//client/views/layout/layout.js

Tracker.autorun(function(){
	Meteor.subscribe('notifications');
});

Template.layout.events({
	'click #myKaleo_button': function(ev){
		$('.new_list_form').css('display', 'none');
		$('#usersList').css('visibility', 'hidden');
		$(".dropdown-toggle:first-child").text('users');
      	$(".dropdown-toggle:first-child").val('users');
	},

	'click .delete_notification': function(ev){
		ev.preventDefault();
		Meteor.call('deleteNotification', this._id);
	}
});

Template.layout.helpers({
	notificationsCollection: function(){
		return notificationsCollection.find({notified_user: Meteor.userId()});
	},

	notificationsExist: function(){
		return notificationsCollection.find().count() != 0;
	},

	isLoggedIn: function(){
		return Meteor.userId() != null;
	}
});