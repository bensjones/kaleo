//server/collections/lists.js

Meteor.publish('lists', function(){
	if(!this.userId){
		return this.ready();
	} else {
		return listCollection.find({owner: this.userId});
	}
});

Meteor.publish('users', function(){
	// use this.added to inform subscriber that new doc as been added
	// this.added(collection, id, fields)

	// var selector = {};
 //  	var options = {fields: {username: 1}};
 //  	return Meteor.users.find(selector, options).fetch();
	return Meteor.users.find();
});
