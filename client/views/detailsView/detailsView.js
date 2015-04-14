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

Template.detailsViewTemplate.onRendered(function(){
	if(document.cookie === ''){
		var x = document.cookie = 'normal';
		Session.set('css', x);
	} else {
		Session.set('css', document.cookie)
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

		var result = confirm("do you want to delete this detail?");
		if (result){
			Meteor.call('deleteDetail', this._id);
		}
		
	},

	'click .detailCheckbox': function(ev){
		ev.preventDefault();

		var detail = $(ev.target).parent();

		if(detail.css('opacity') == 1){
			createCookie('opaque', 0.4, 14);
			var opaque_detail = readCookie('opaque');
			Session.set('css', opaque_detail);
		} else {
			createCookie('clear', '1', 14);
			var clear_detail = readCookie('clear');
			Session.set('css', clear_detail);
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

// ~~~~COOKIES FOR DETAIL CHECKBOX OPACITY~~~~

// function that creates the cookie
function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

// function that reads the cookie
function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function eraseCookie(name) {
	createCookie(name,"",-1);
}

