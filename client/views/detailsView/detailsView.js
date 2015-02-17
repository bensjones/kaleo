//client/views.detailsView.js

Router.route('detailsView', {

	path: '/details/:_id',
	template: 'detailsViewTemplate',
	loadingTemplate: 'loading',
	waitOn: function(){
		return Meteor.subscribe('lists');
	},

	data: function(){
		return listCollection.findOne({_id: this.params._id});
	}
});

Template.detailsViewTemplate.helpers({

	detailsCollection: function(){
		return detailCollection.find();
	}
});

Template.detailsViewTemplate.events({
	'submit form': function(ev){
		ev.preventDefault();

		var newDetail = {
			detail: $(ev.target).find('[name = detail]').val(),
			parentId: $(ev.target).find('[name = parentId]').val()
		}

		Meteor.call('newDetail', newDetail);
	}
});