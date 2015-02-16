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

		var newList = {
			title: $(ev.target).find('[name=title]').val(),
			description: $(ev.target).find('[name=description]').val(),
			dateCreated: new Date(),
			owner: Meteor.userId()
		}

		// listCollection.insert(newList);
		Meteor.call('addList', newList);

		$('.form-group').children().val('');
	},

	'click #delete': function(ev){
		ev.preventDefault();

		listCollection.remove(this._id);
	},

	'click #new-list-button': function(ev){
		ev.preventDefault();

		$('.new-list-form').show();
	}
})
