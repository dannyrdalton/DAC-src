app.factory('Playlist', ['$resource', 'apiPrefix', function($resource, apiPrefix) {
	return $resource(apiPrefix + '/playlists/:id', {
		_suffx: '.json',
		id: '@id'
	}, {
		update: {
			method: 'PUT'
		}
	});
}]);
