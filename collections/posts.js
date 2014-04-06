Posts = new Meteor.Collection('posts');

Posts.allow({
	update: ownsDocument,
	remove: ownsDocument
})

Meteor.methods({
	post: function(postAttributes){
		var user = Meteor.user();

		var postWithSameLink = Posts.findOne(
			{ url: postAttributes.url }
		);

		// ensure the user is logged in
		if (!user){
			throw new Meteor.Error(401, "You need to login to post new stories");
		}

		// ensure the post has a title
		if (!postAttributes.title) {
			throw new Meteor.Error(422, "Please provide a title");
		}

		// ensure there are no previous post with the same link
		if (postAttributes.url && postWithSameLink) {
			throw new Meteor.Error(302, "already posted", postWithSameLink._id)
		}

		// pick out the whitelisted keys
		var post = _.extend(_.pick(postAttributes, 'url', 'title', 'message'),
				{
					userId: user._id,
					author: user.username,
					submitted: new Date().getTime()
				});
		var postId = Posts.insert(post);
		console.log('created by Method ' + postId);
		return postId;
	}
})