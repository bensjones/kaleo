//client/views.detailsView.js

Router.route('detailsView', {
	path: '/details/:_id',
	template: 'detailsViewTemplate',
	loadingTemplate: 'loading',
	waitOn: function(){
		return [
			Meteor.subscribe('lists'),
			Meteor.subscribe('sharedLists'),
			Meteor.subscribe('details', this.params._id),
			Meteor.subscribe('sharedDetails', this.params._id)
		]
	},

	data: function(){
		return listCollection.findOne({_id: this.params._id});
	},

	action: function(){
		var currentList = listCollection.findOne({_id: this.params._id});
		if(typeof currentList == "undefined"){
			this.redirect('listView');
		} else {
			this.render('detailsViewTemplate');	
		}
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

		var detail = $(ev.target).parent();
		var delete_button = document.getElementById('delete-detail');

		if(!detail.hasClass('toggle')){
			detail.addClass('toggle');
			$('#delete-detail').addClass('untoggle');
			} else {
				var result = confirm("do you want to delete this detail?");
				if (result){
					Meteor.call('deleteDetail', this._id);
			}
		}
	},

	'click #delete-list': function(ev){
		ev.preventDefault();

		var result = confirm('do you want to delete this list and all of its details?')
		if(result){
			Meteor.call('deleteListAndDetails', this._id);
		}
	}
});