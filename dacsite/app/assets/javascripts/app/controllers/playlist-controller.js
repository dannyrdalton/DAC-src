app.controller('PlaylistCtrl', ['$scope', 'MusicPlayer',
	function($scope, MusicPlayer) {
		
		$scope.playlist = [];	

		$scope.checkPlaylist = function() {
			console.log($scope.playlist);
		};

		$scope.playTrack = function(track) {
			MusicPlayer.playFromPlaylist(track);
		};

		//events
		$scope.$on('playlist.newSound', function(event, data) {
			$scope.playlist = MusicPlayer.getPlaylist();
		});
	}
]);
