app.controller('AppCtrl', ['$scope', '$state', '$cookieStore', function($scope, $state, $cookieStore) {

	$scope.currentUser = $cookieStore.get('_dac_user');
	
	$scope.checkUser = function() {
		console.log($scope.currentUser);
	};

	$scope.$on('login', function(event, data) {
		if (data.success) {
			$scope.currentUser = $cookieStore.get('_dac_user');
		}
	});	

	$scope.$on('logout', function(event, data) {
		if (data.success) {
			$scope.currentUser = null;
		}
	});	
}]);
