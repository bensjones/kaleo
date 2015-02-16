//server/collections/lists.js

Meteor.publish('lists', function(){
	if(this.userId){
		console.log(this.userId);
		return listCollection.find();
		// return listCollection.find({owner: this.userId});
	}
});
