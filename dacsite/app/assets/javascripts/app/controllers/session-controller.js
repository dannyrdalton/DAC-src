app.controller('SessionCtrl', ['$scope', '$state', '$cookieStore', 'Session',
	function($scope, $state, $cookieStore, Session) {
		$scope.session = Session.userSession;
		
		$scope.loginError = false;
		$scope.loginErrorMessage = "";
		
		$scope.create = function() {
			Session.login($scope.session);
		};

		$scope.destroy = function() {
			Session.logout($scope.session);
		};

		$scope.$on('login', function(event, data) {
			console.log('login');
			console.log(data);
			if (data.success) {
				$scope.session.username = "";
				$scope.session.password = "";
				$scope.session.remember_me = false;
				$state.transitionTo('blog');
			} else {
				$scope.loginErrorMessage = data.error;
				$scope.loginError = true;
			}		
		});
	}
]);
