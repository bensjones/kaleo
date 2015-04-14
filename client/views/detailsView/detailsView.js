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

Template.detailsViewTemplate.onCreated(function(){
	// Session.setPersistent('class', 'untoggle');
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

		var result = confirm("do you want to delete this detail?");
		if (result){
			Meteor.call('deleteDetail', this._id);
		}
		
	},

	'click .detailCheckbox': function(ev){
		var detail = $(ev.target).parent();

		// if(!detail.hasClass('toggle')){
		// 	Session.setPersistent('var', 'toggle');
  // 			// detail.fadeTo(200, Session.get('opacity'));
  // 			detail.addClass(Session.get('var'));
  // 			console.log(Session);
		// } else {
		// 	Session.setPersistent('var', 'untoggle');
		// 	// detail.fadeTo(200, Session.get('opacity'));
		// 	detail.removeClass('toggle');
		// 	detail.addClass(Session.get('var'));
		// }

		if(Session.get('class') != 'toggle'){
			Session.setPersistent('class', 'toggle');
		} else {
			detail.removeClass('toggle');
			Session.setPersistent('class', 'untoggle');
		}

		console.log(Session.get('class'));
		detail.addClass(Session.get('class'));

	},

	'click #delete-list': function(ev){
		ev.preventDefault();

		var result = confirm('do you want to delete this list and all of its details?')
		if(result){
			Meteor.call('deleteListAndDetails', this._id);
		}
	}
});