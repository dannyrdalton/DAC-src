app.factory('Comment', function($resource, apiPrefix) {
	return $resource(apiPrefix + '/comments/:id', {
		_suffx: '.json',
		id: '@id',
	}, {
		update: {
			method: 'PUT'
		}
	});
});
