Tinytest.add('Errors collection works', function(test){
  test.equal(Errors.collection.find({}).count(), 0);

  Errors.throw('an error');
  test.equal(Errors.collection.find({}).count(), 1);

  Errors.collection.remove({});
});


Tinytest.addAsync('Errors template works', function(test, done){

  Errors.throw('a new error');
  test.equal(Errors.collection.find({seen: false}).count(), 1);

  //renders the template
  UI.insert(UI.render(Template.meteorErrors), document.body);

  // after waiting 500 ms, check collection
  Meteor.setTimeout(function(){
    test.equal(Errors.collection.find({seen: false}).count(), 0);
    test.equal(Errors.collection.find({}).count(), 1);

    Errors.clearSeen();

    test.equal(Errors.collection.find({seen: true}).count(), 0);
    done();
  }, 500)

});
