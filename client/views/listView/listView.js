//client/views/listView.js

Router.route('listView', {
	path: '/',
	template: 'listViewTemplate',
	loadingTemplate: 'loading',
	waitOn: function(){
		return Meteor.subscribe('lists');
	}
});

Template.listViewTemplate.helpers({

	listCollection: function(){
		return listCollection.find();
	}
});

Template.listViewTemplate.events({
	'submit form': function(ev){
		ev.preventDefault();

		console.log('form submitted');

		var today = new Date();
		
		var newList = {
			title: $(ev.target).find('[name=title]').val(),
			description: $(ev.target).find('[name=description]').val(),
			dateCreated: today.toDateString(),
			owner: Meteor.userId()
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
		$('.new-list-form').show();
	},

	'click #edit-list': function(ev){
		ev.preventDefault();
		$('.listViewEntry').attr('contentEditable', true);
	}
})
