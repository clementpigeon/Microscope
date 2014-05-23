Meteor.publish('posts', function(limit){
	return Posts.find({}, {sort: {submitted: -1}, limit: limit});
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
