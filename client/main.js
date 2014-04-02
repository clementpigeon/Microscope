Meteor.subscribe('posts', "me");

Router.configure({
	layoutTemplate: 'layout'
})

Router.map(function(){
	this.route('postsList');
	// this.route('postsList', {path: "/"});
})