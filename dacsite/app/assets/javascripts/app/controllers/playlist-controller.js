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
		$scope.$on('logout', function(event, data) {
			$scope.playlist = [];
		});	
	
		$scope.$on('playlist.change', function(event, data) {
			$scope.playlist = MusicPlayer.getPlaylist();
		});
	}
]);
