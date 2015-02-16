//server/collections/lists.js

Meteor.publish('lists', function(){
	if(this.userId){
		return listCollection.find({owner: this.userId});
	}
});
