Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	waitOn: function () {
		return Meteor.subscribe('notifications');
	}
});

PostsListController = RouteController.extend({
	template: 'postsList',
	increment: 5,
	limit: function(){
		return parseInt(this.params.postsLimit || this.increment);
	},
	findOptions: function(){
		return { sort: {submitted: -1}, limit: this.limit() };
	},
	waitOn: function () {
		return Meteor.subscribe('posts', this.findOptions());
	},
	posts: function(){
		return Posts.find({}, this.findOptions())
	},
	data: function(){
		var hasMore = this.posts().count() === this.limit();
		var nextPath = this.route.path({postsLimit: this.limit() + this.increment});
		return {
			nextPath: hasMore ? nextPath : null,
			posts: this.posts()
		};
	}
})

Router.map(function(){

	this.route('postPage', {
		path: "/post/:_id",
		waitOn: function () {
			return Meteor.subscribe('comments', this.params._id);
		},
		data: function(){
			return Posts.findOne(this.params._id);
		}
	});

	this.route('postSubmit', {
		path: "/submit"
	});

	this.route('postEdit', {
		path: "/post/:_id/edit",
		data: function(){
			return Posts.findOne(this.params._id);
		}
	});

	this.route('postsList', {
		path: "/:postsLimit?",
		controller: PostsListController
	})
})

var requireLogin = function(pause){
	if (! Meteor.user()){
		if (Meteor.loggingIn()){
			this.render(this.loadingTemplate);
		} else {
			this.render('accessDenied');
		}
		pause();
	}
}

Router.onBeforeAction('loading');
Router.onBeforeAction(requireLogin, {only: 'postSubmit'} );
Router.onBeforeAction(function(){ Errors.clearSeen() })
