Meteor.publish('posts', function(options){
	return Posts.find({}, options);
});

Meteor.publish('comments', function(){
  return Comments.find();
});

Meteor.publish('notifications', function(){
  // a publish function has the current user's _id available at this.userId
  return Notifications.find({userId: this.userId});
});

// Meteor.publish('comments', function(post){
//   return Comments.find({postId: post._id});
// });
