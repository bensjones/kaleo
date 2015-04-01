//client/views/listView.js

Router.route('listView', {
	path: '/',
	template: 'listViewTemplate',
	loadingTemplate: 'loading',
	waitOn: function(){
		return [Meteor.subscribe('users'),
		Meteor.subscribe('lists')
		];
	}
});

Template.listViewTemplate.helpers({

	listCollection: function(){
		return listCollection.find();
	},

	allUsers: function(){
		return Meteor.users.find();
	},

	sharedUserField: function(){
		return document.getElementById('shared_user_field') == '';
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
			shared_user: $(ev.target).find('[name=shared_user]').val()
		}

		Meteor.call('addList', newList);
		$('.form-group').children().val('');
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
		if($('.new_list_form').css('display')=='none')
			$('.new_list_form').css('display', 'block');
		else
			$('.new_list_form').css('display', '');
			$('#usersList').css('visibility', 'hidden');
	},

	'click #edit-list': function(ev){
		ev.preventDefault();
		$('.listViewEntry').attr('contentEditable', true);
	},

	// 'click #share_button': function(ev){
	// 	ev.preventDefault();
	// 	Meteor.call('returnUsers', function(err, users){
	// 		console.log(users);
	// 	});
	// },

	'click #share_button': function(ev){
		ev.preventDefault();
		if($('#usersList').css('visibility')=='hidden')
			$('#usersList').css('visibility', 'visible');
		else
			$('#usersList').css('visibility', 'hidden');
	},

	'click .select_to_share': function(ev){
		ev.preventDefault();
		console.log(this._id);
		shared_user_input = document.getElementById('shared_user_field');
		shared_user_input.value = this._id;
	}
})
