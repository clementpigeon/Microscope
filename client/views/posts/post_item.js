Template.postItem.helpers({
  domain: function() {
    var a = document.createElement('a');
    a.href = this.url;
    return a.hostname;
  },
  ownPost: function(){
  	return Meteor.userId() && (this.userId == Meteor.userId())
  }
});