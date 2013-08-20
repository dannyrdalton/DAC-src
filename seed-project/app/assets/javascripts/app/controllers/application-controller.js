app.controller('AppCtrl', ['$scope', '$http', '$cookieStore', 'Session', 'MusicPlayer', 
function($scope, $http, $cookieStore, Session, MusicPlayer) {

	$scope.currentUser = Session.currentUser;

	//for testing	
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
			$scope.currentUser = Session.currentUser;
		}
	});	

	$scope.$on('logout', function(event, data) {
		if (data.success) {
			$scope.currentUser = null;
			MusicPlayer.setPlaylist([]);
		}
	});

	$scope.$on('playlist.change', function(event, data) {
    console.log('playlist:');
		console.log(MusicPlayer.getPlaylist());
	});

}]);
