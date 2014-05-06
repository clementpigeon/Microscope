Template.postItem.helpers({
  domain: function() {
    var a = document.createElement('a');
    a.href = this.url;
    return a.hostname;
  },
  ownPost: function(){
  	return Meteor.userId() && (this.userId == Meteor.userId())
  },
  commentsCountString: function(){
    var count = Comments.find({postId: this._id}).count();
    return count > 1 ? count + " comments" : count + " comment"
  }
});
