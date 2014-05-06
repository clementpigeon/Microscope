Template.postSubmit.helpers({

});

Template.postSubmit.events({
	'submit form': function(e){
		e.preventDefault();
		var post = {
			url: $(e.target).find('[name=url]').val(),
			title: $(e.target).find("[name=title]").val(),
			message: $(e.target).find("[name=message]").val()
		};

		Meteor.call('post', post, function(error, id){
			if (error){
				Errors.throw(error.reason);
				if (error.error === 302){
					// we use the ID of the previously created article, that we put
					// in error.details (3rd argument of the Meteor.Error constructor)
					// in the 'post' method
					Router.go('postPage', {_id: error.details})
				}
			} else {
				Router.go('postPage', {_id: id});
			}
		})

	}
});






































