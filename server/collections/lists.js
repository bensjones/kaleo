//server/collections/lists.js

Meteor.publish('lists', function(){
	//TODO malicious user can imitate userId to pass logic gate
	if(!this.userId){
		return this.ready();
	} else {
		return listCollection.find({owner: this.userId});
	}
});

Meteor.publish('users', function(){
	console.log('hello');
});