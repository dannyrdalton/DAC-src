app.controller('UserNavCtrl', ['$scope', '$cookieStore', 'Session',
	function($scope, $cookieStore, Session) {
		
		$scope.signedIn = !!$cookieStore.get('_dac_user');

		$scope.logout = function() {
			Session.logout(Session.userSession);
		};

		$scope.$on('login', function(event, data) {
			if (data.success) {
				$scope.signedIn = true;
			}
		});	

		$scope.$on('logout', function(event, data) {
			$scope.signedIn = false;
		});
	}
]);
