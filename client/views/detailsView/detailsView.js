//client/views.detailsView.js

Router.route('detailsView', {

	path: '/details/:_id',
	template: 'detailsViewTemplate',
	loadingTemplate: 'loading',
	waitOn: function(){
		return [
			Meteor.subscribe('lists'),
			Meteor.subscribe('details', this.params._id)
		]
	},

	data: function(){
		return listCollection.findOne({_id: this.params._id});
	}
});

Template.detailsViewTemplate.helpers({
	detailsCollection: function(){
		return detailsCollection.find();
	}
});

Template.detailsViewTemplate.events({
	'submit form': function(ev){
		ev.preventDefault();
		var detailFormData = {
			detail: $(ev.target).find('[name = detail]').val(),
			parentId: $(ev.target).find('[name = parentId]').val()
		}

		Meteor.call('addDetail', detailFormData);
		$('.form-group').children().val('');
	},

	'click #delete-detail': function(ev){
		ev.preventDefault();
		Meteor.call('deleteDetail', this._id);
	},

	'click .detailCheckbox': function(ev){
		var detail = $(ev.target).parent();

		if(!detail.hasClass('toggle')){
			detail.addClass('toggle');	
		} else {
			detail.removeClass('toggle');
		}
		
	}
});