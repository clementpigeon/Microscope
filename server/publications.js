Meteor.publish('posts', function(author){
	return Posts.find();
});

Meteor.publish('comments', function(){
  return Comments.find();
});

// Meteor.publish('comments', function(post){
//   return Comments.find({postId: post._id});
// });
