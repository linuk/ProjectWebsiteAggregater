import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
	// start up function that creates entries in the Websites databases.

	if (!Websites.findOne()){
		console.log("No websites yet. Creating starter data.");
		  Websites.insert({
			title:"Goldsmiths Computing Department", 
			url:"http://www.gold.ac.uk/computing/", 
			votes:0,
			description:"This is where this course was developed.",
			createdOn:new Date()
		});
		 Websites.insert({
			title:"University of London", 
			url:"http://www.londoninternational.ac.uk/courses/undergraduate/goldsmiths/bsc-creative-computing-bsc-diploma-work-entry-route", 
			votes:0,
			description:"University of London International Programme.", 
			createdOn:new Date()
		});
		 Websites.insert({
			title:"Coursera", 
			url:"http://www.coursera.org", 
			votes:0,
			description:"Universal access to the world’s best education.", 
			createdOn:new Date()
		});
		Websites.insert({
			title:"Google", 
			url:"http://www.google.com", 
			votes:0,
			description:"Popular search engine.", 
			createdOn:new Date()
		});
	}

});
