app.factory('BlogPost', function($resource, apiPrefix) {
  return $resource(apiPrefix + '/blog_posts/:id', {
    _suffx: '.json',
		id: '@id'
  }, {
    update: {
      method: 'PUT'
    }
  });
});
