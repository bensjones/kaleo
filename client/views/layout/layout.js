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
	}
});

Template.layout.helpers({
	notificationsCollection: function(){
		return notificationsCollection.find({notified_user: Meteor.userId()});
	}
});