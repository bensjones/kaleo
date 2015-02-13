//server/collections/lists.js

Meteor.publish('lists', function(){
	return listCollection.find();
});