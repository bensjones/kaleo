//client/views/listView.js

Router.route('listView', {
	path: '/',
	template: 'listViewTemplate',
	loadingTemplate: 'loading',
	waitOn: function(){
		return [
		Meteor.subscribe('users'),
		Meteor.subscribe('lists'),
		Meteor.subscribe('sharedLists'),
		Meteor.subscribe('notifications')
		];
	}
});

Template.listViewTemplate.helpers({

	listCollection: function(){
		return listCollection.find({owner: Meteor.userId()});
	},

	noLists: function(){
		return listCollection.find({owner: Meteor.userId()}).fetch().length == 0;
	},

	allUsers: function(){
		return Meteor.users.find({}, {fields: {emails: 1}});
	},

	sharedLists: function(){
		return listCollection.find({shared_user: Meteor.userId()});
	},

	notificationsCollection: function(){
		return notificationsCollection.find({notified_user: Meteor.userId()});
	},

	sharedListsExist: function(){
		return listCollection.find({shared_user: Meteor.userId()}).fetch().length != 0;
	},

	findUser: function(){
		return Meteor.users.find()
	},

	sharedUserField: function(){
		var distinctEntries = _.uniq(listCollection.find({}, 
		{sort: {shared_user: 1}, fields: {shared_user: true}
		}).fetch().map(function(x) {
		    return x.shared_user;
		}), true);
		return distinctEntries != '';
	}
});

Template.listViewTemplate.events({
	'submit form': function(ev){
		ev.preventDefault();

		var today = new Date();
		
		var newList = {
			title: $(ev.target).find('[name=title]').val(),
			description: $(ev.target).find('[name=description]').val(),
			dateCreated: today.toDateString(),
			owner: Meteor.userId(),
			owner_email: Meteor.users.find({_id: Meteor.userId()}).fetch()[0].emails[0].address,
			shared_user: $(ev.target).find('[name=shared_user]').val(),
			shared_user_email: Meteor.users.find({_id: $(ev.target).find('[name=shared_user]').val()})
			.fetch()[0].emails[0].address
		}

		Meteor.call('addList', newList, function(err, list){
			return list;
		});
		
		if(!newList.shared_user == ''){
			Meteor.call('addNotification', newList);
		}
		
		$('.form-group').children().val('');
		$('.new_list_form').css('display', 'none');
		$('#usersList').css('visibility', 'hidden');
	},

	'click #delete-list': function(ev){
		ev.preventDefault();

		var result = confirm('do you want to delete this list?');
		if(result){
			Meteor.call('deleteList', this._id);
		}
	},

	'click #new-list-button': function(ev){
		ev.preventDefault();
		if($('.new_list_form').css('display')=='none'){
			$('.new_list_form').css('display', 'block');
		}else{
			$('.new_list_form').css('display', 'none');
			$('#usersList').css('visibility', 'hidden');
			$(".dropdown-toggle:first-child").text('users');
      		$(".dropdown-toggle:first-child").val('users');
		}
	},

	'click #edit-list': function(ev){
		ev.preventDefault();
		$('.listViewEntry').attr('contentEditable', true);
	},

	'click #share_button': function(ev){
		ev.preventDefault();
		if($('#usersList').css('visibility')=='hidden'){
			$('#usersList').css('visibility', 'visible');
			$('#shared_user_field').css('display', 'inline-block');
		}else{
			$('#usersList').css('visibility', 'hidden');
			$('#shared_user_field').css('display', 'inline-block');
		}
	},

	'click .select_to_share': function(ev){
		ev.preventDefault();
		var shared_user_input = document.getElementById('shared_user_field');
		shared_user_input.value = this._id;
	},

	'click .shared_users_dropdown_toggle li a': function(ev){
		ev.preventDefault();
		var shared_user_input = document.getElementById('shared_user_field');
		shared_user_input.value = this._id;
	}
})


$(document).ready(function(){
	$(document).on('click', '.dropdown-menu li a', function(ev){
		ev.preventDefault();
		$(".dropdown-toggle:first-child").text($(this).text());
      	$(".dropdown-toggle:first-child").val($(this).text());
	});
});
