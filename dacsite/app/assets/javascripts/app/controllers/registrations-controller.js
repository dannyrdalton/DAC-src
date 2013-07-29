app.controller('RegistrationCtrl', ['$scope', '$state', 'Session',
	function($scope, $state, Session) {
		$scope.registration = Session.userRegistration;

		$scope.create = function() {
			Session.register($scope.registration);
		};

		$scope.$on('registration', function(event, data) {
			if (data.success) {
				$state.transitionTo('blog');
			}
		});
	}
]);
