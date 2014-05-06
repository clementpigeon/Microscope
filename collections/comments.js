Comments = new Meteor.Collection('comments');

Meteor.methods({
  comment: function(commentAttributes){
    var user = Meteor.user();
    var post = Posts.findOne(commentAttributes.postId);

    // ensure the user is logged in
    if (!user){
      throw new Meteor.Error(401, "You need to login to post a comment.");
    }

    // ensure the post has a body
    if (!commentAttributes.body) {
      throw new Meteor.Error(422, "No content.");
    }

    if (!post) {
      throw new Meteor.Error(422, "Post doesn't exist.");
    }

    // pick out the whitelisted keys
    var comment = {
      body: commentAttributes.body,
      userId: user._id,
      author: user.username,
      postId: commentAttributes.postId,
      submitted: new Date().getTime()
    };

    var commentId = Comments.insert(comment);
    return commentId;

  }
})
