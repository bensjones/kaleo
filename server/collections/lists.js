//server/collections/lists.js

Meteor.publish('lists', function(){
	if(!this.userId)
		return this.ready();
	else 
		return listCollection.find({owner: this.userId});
});

Meteor.publish('sharedLists', function(){
	if(!this.userId)
		return this.ready();
	else
		return listCollection.find({shared_user: this.userId});
});

Meteor.publish('users', function(){
	return Meteor.users.find({}, {fields: {emails: 1}});
});
