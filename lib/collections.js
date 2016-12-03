Websites = new Mongo.Collection("websites");

Websites.allow({
	insert:function(userId, doc){
		return true;
	},

	update:function(userId, doc){
		return true;
	}

})