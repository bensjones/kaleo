//client/router.js

Router.configure({

	layoutTemplate: 'layout'
});

var requireLogin = function() {
	if (! Meteor.user()){
		this.render('loginTemplate');
	} else if (Meteor.loggingIn()) {
		this.render('listViewTemplate')
	} else {
		this.next();
	}
}

var signInRoute = function(){
	if(!(Meteor.loggingIn() || Meteor.user())){
		this.render('loginTemplate');
	} else {
		this.next();
	}
}

var loggingIn = function(){
	if(Meteor.loggingIn()){
		console.log('loggingingingg');
	}
}

Router.onBeforeAction(requireLogin);
Router.onBeforeAction(signInRoute);
// Router.onBeforeAction(loggingIn);
