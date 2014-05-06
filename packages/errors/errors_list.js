Template.meteorErrors.helpers({
	errors: function(){
		return Errors.collection.find();
	}
});

Template.meteorError.rendered = function(){
	var error = this.data;
  // using defer so that this is not executed if a redirect happens first
	Meteor.defer(function(){
		Errors.collection.update(error._id, {$set: {seen: true}});
	})
}
