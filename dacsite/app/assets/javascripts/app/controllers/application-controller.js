app.controller('AppCtrl', ['$scope', '$state', '$cookieStore', '$timeout', 'MusicPlayer', 
function($scope, $state, $cookieStore, $timeout, MusicPlayer) {

	$scope.currentUser = $cookieStore.get('_dac_user');
	
	$scope.checkUser = function() {
		console.log($scope.currentUser);
	};


	//control of MusicPlayer
	$scope.playPause = function() {
		MusicPlayer.playPause();
	};
	
	$scope.playFromBlog = function(track) {
		console.log(track);
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
			console.log('login fired');
			$scope.currentUser = $cookieStore.get('_dac_user');
		}
	});	

	$scope.$on('logout', function(event, data) {
		if (data.success) {
			$scope.currentUser = null;
		}
	});

}]);
