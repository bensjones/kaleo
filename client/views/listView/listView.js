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