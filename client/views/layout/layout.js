//client/views/layout/layout.js

Template.layout.events({
	'click #myKaleo_button': function(ev){
		$('.new_list_form').css('display', 'none');
		$('#usersList').css('visibility', 'hidden');
	}
});