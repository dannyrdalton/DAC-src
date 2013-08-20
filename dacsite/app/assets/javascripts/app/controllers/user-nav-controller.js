app.controller('UserNavCtrl', ['$scope', '$state', '$cookieStore', 'Session',
	function($scope, $state, $cookieStore, Session) {
		
		$scope.signedIn = !!$cookieStore.get('_dac_user');

		$scope.logout = function() {
			Session.logout(Session.userSession);
			$state.transitionTo('blog');
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
