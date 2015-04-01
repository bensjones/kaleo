//server/collections/lists.js

Meteor.publish('lists', function(){
	if(!this.userId){
		return this.ready();
	} else {
		return listCollection.find({owner: this.userId});
	}
});

Meteor.publish('users', function(){
	return Meteor.users.find();
});
