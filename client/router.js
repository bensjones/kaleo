//client/router.js

Router.configure({

	layoutTemplate: 'layout'
});

var requireLogin = function() {
	if (! Meteor.user()){
		this.render('login');
	} else {
		this.next();
	}
}

var signInRoute = function(){
	if(!(Meteor.loggingIn() || Meteor.user())){
		this.render('login');
	} else {
		this.next();
	}
};

Router.onBeforeAction(requireLogin, {except: 'login'});
Router.onBeforeAction(signInRoute, {except: 'login'});