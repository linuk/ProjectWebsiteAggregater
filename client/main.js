import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';


/*==============================
=            Router            =
==============================*/

Router.configure({
	layoutTemplate:"ApplicationLayout"
});

Router.route('/',function(){
	this.render('navbar',{
		to:'navbar'
	});

	this.render('website_form',{
		to:'main1'
	});

	this.render('website_list',{
		to:'main2'
	})
})

Router.route('/:_id',function(){
	this.render('navbar',{
		to:'navbar'
	});

	this.render('website_item_detail',{
		to:'main1',
		data:function(){
			return Websites.findOne({_id:this.params._id});
		}
	});

	this.render('',{
		to:'main2'
	});
})


/*=====  End of Router  ======*/




/////
// template helpers 
/////


// helper function that returns all available websites
Template.website_list.helpers({
	websites:function(){
		return Websites.find({},{sort:{votes:-1}});
	}
});


/////
// template events 
/////



Template.website_form.events({
	
	"click .js-toggle-website-form":function(event){
		$("#website_form").toggle('slow');
	}, 

	"submit .js-save-website-form":function(event){

		// here is an example of how to get the url out of the form:
		var uploaded_url = event.target.url.value;
		var uploaded_title = event.target.title.value;
		var uploaded_description = event.target.description.value;
		//  put your website saving code in here!	
		if(Meteor.user()){
			Websites.insert({
				title:uploaded_title, 
				url:"http://"+uploaded_url, 
				votes:0,
				description:uploaded_description, 
				createdOn:new Date()
			});

			$("#website_form").toggle('hide');
			event.target.url.value="";
			event.target.title.value="";
			event.target.description.value="";
		}

		return false;// stop the form submit from reloading the page

	}
});



Template.website_item.events({
	"click .js-upvote":function(event){
		// example of how you can access the id for the website in the database
		// (this is the data context for the template)
		if(Meteor.user()){
			var website_id = this._id;
			var website_votes = this.votes+1;
			Websites.update({_id:website_id},{$set:{votes:website_votes}});
		};	
		// put the code in here to add a vote to a website!
		// Websites
		return false;// prevent the button from reloading the page
	}, 
	"click .js-downvote":function(event){

		// example of how you can access the id for the website in the database
		// (this is the data context for the template)
		if(Meteor.user()){
			var website_id = this._id;
			var website_votes = this.votes-1;
			Websites.update({_id:website_id},{$set:{votes:website_votes}});
		};
// put the code in here to remove a vote from a website!

		return false;// prevent the button from reloading the page
	}
})



Template.website_item_detail.events({
	"click .js-upvote":function(event){
		// example of how you can access the id for the website in the database
		// (this is the data context for the template)
		if(Meteor.user()){
			var website_id = this._id;
			var website_votes = this.votes+1;
			Websites.update({_id:website_id},{$set:{votes:website_votes}});
		};
		// put the code in here to add a vote to a website!
		// Websites
		return false;// prevent the button from reloading the page
	}, 
	"click .js-downvote":function(event){

		// example of how you can access the id for the website in the database
		// (this is the data context for the template)
		if(Meteor.user()){
			var website_id = this._id;
			var website_votes = this.votes-1;
			Websites.update({_id:website_id},{$set:{votes:website_votes}});
		};

		return false;// prevent the button from reloading the page
	},

	"submit .js-comment-website-form":function(event){

		if(Meteor.user()){
			var comments = event.target.comments.value;
			var website_id = this._id;
			var userId=Meteor.user().emails[0].address;
			var commentedOn=new Date();
			var time=commentedOn.toLocaleString()
			var website_comments = event.target.comments.value;
			Websites.update({_id:website_id},{$push:{comments:{
				user:userId,
				comments:comments,
				commentedOn:time
			}}});

		};

		event.target.comments.value="";

		return false;// stop the form submit from reloading the page

	}


});




