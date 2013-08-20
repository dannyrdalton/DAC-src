app.directive('dacPlaylist', ['MusicPlayer',
	function(MusicPlayer) {
		return {
			restrict: 'E',
			controller: 'PlaylistCtrl',
			templateUrl: '/assets/playlist.html.erb',
			link: function(scope, elem, attrs) {

			}
		}
	}
]);
