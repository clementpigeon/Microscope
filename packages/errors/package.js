Package.describe({
  summary: "Display errors to users with Rails-like flash message"
});

Package.on_use(function(api, where){
  api.use(['minimongo', 'mongo-livedata', 'templating'], 'client');
  api.add_files(['errors.js', 'errors_list.html', 'errors_list.js'], 'client');

  if (api.export) api.export('Errors');
})

Package.on_test(function(api){
  api.use('errors', 'client');
  api.use(['tinytest', 'test-helpers'], 'client');

  api.add_files('errors_test.js', 'client');

})
