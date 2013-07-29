app.controller('SessionCtrl', ['$scope', '$state', '$cookieStore', 'Session',
	function($scope, $state, $cookieStore, Session) {
		$scope.session = Session.userSession;
		
		$scope.signedIn = Session.signedIn;
		
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
				$scope.signedIn = true;
				$scope.session.username = "";
				$scope.session.password = "";
				$state.transitionTo('blog');
			}		
		});
		
		$scope.$on('logout', function(event, data) {
			console.log('logout');
			if (data.success) {
				$scope.signedIn = false;
			}
		});
	}
]);
