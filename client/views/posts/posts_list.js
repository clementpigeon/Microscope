

Template.postsList.helpers({
  posts: function(){
    // being based on a cursor, posts in the template
    // will be reactive
    return Posts.find({}, {sort: {"submitted": -1}});
  }
});