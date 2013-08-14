app.controller('RegistrationCtrl', ['$scope', '$state', 'Session',
	function($scope, $state, Session) {
		$scope.registration = Session.userRegistration;

		$scope.registrationError = false;
		$scope.registrationMessage = '';
		
		$scope.create = function() {
			Session.register($scope.registration);
		};

		$scope.$on('registration', function(event, data) {
			if (data.success) {
				$state.transitionTo('register.success');
			} else {
				console.log(data);
				if (data.messages.email) {
					$scope.registrationErrorMessage = "A user with that email already exists."
				} else if (data.messages.username) {
					$scope.registrationErrorMessage = "That username is taken. Please choose a new one."
				}
				$scope.registrationError = true;
			}
		});
	}
]);
