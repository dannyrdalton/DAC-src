app.controller('AppCtrl', ['$scope', '$state', '$http', '$cookieStore', '$timeout', 'MusicPlayer', 'Playlist', 
function($scope, $state, $http, $cookieStore, $timeout, MusicPlayer, Playlist) {

	$scope.currentUser = $cookieStore.get('_dac_user');
	
	//set MusicPlayerPlaylist
	if ($scope.currentUser) {
		Playlist.get({ id: $scope.currentUser.playlist_id }, function(response) {
			var playlist = JSON.parse(response.playlist);
			console.log('playlist from server');
      console.log(playlist);
			MusicPlayer.setInitialPlaylist(playlist);	
		});
	}
		
	$scope.checkUser = function() {
		console.log($scope.currentUser);
		console.log(MusicPlayer.getPlaylist());
	};


	//control of MusicPlayer
	$scope.playPause = function() {
		MusicPlayer.playPause();
	};
	
	$scope.playFromBlog = function(track) {
		MusicPlayer.playFromBlog(track);
				//Playlist.update({ id: $scope.currentUser.playlist_id, playlist: MusicPlayer.getPlaylist() });
	};

	$scope.skipBack = function() {
		MusicPlayer.skipBack();
	};

	$scope.skipFwd = function() {
		MusicPlayer.skipFwd();
	};

	//events
	$scope.$on('login', function(event, data) {
		if (data.success) {
			$scope.currentUser = $cookieStore.get('_dac_user');
			Playlist.get({ id: $scope.currentUser.playlist_id }, function(response) {
				var playlist = JSON.parse(response.playlist);
				console.log('playlist from server');
				console.log(playlist);
				MusicPlayer.setPlaylist(playlist);
			});
		}
	});	

	$scope.$on('logout', function(event, data) {
		if (data.success) {
			$scope.currentUser = null;
		}
	});

	$scope.$on('playlist.newSound', function(event, data) {
    console.log('playlist:');
		console.log(MusicPlayer.getPlaylist());
		if ($scope.currentUser) {
			$http.put('/api/playlists/' + $scope.currentUser.playlist_id, { playlist: MusicPlayer.getPlaylist() })
    	.success(function(data, status, headers, config) {
				console.log(data);
   		});
		}
	});

}]);
