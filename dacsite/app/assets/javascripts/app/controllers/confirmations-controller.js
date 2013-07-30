app.controller('ConfirmationCtrl', ['$scope', '$rootScope', '$http', '$state', '$stateParams', 'Session',
	function($scope, $rootScope, $http, $state, $stateParams, Session) {
		$scope.user = { email: "" };
		
		$scope.resendConfirmationEmail = function() {
			console.log('sending confirmation instructions');
			$http.post('/users/confirmation', {
				'user': {
					'email': $scope.user.email
				}
			}).success(function(data, status, headers, config) {
				if (data.success) {
					console.log('resend success');
					console.log(data);
					$state.transitionTo('login', { message: 'You should receive a new confirmation email shortly.' });
				} else {
					console.log('resend failure');
					console.log(data);
				}
			});	
		};

		if ($stateParams.confirmationToken) {
			$http.get('/users/confirmation?confirmation_token=' + $stateParams.confirmationToken)
			.success(function(data, status, headers, config) {
				console.log(data);
				if (data.success) {
					console.log('confirmation success');
					Session.setUser(data.resource);	
					$rootScope.$broadcast('login', { success: true });
        	$state.transitionTo('blog', { message: 'You have successfully confirmed your email. You are now signed in.' });
				} else {
					console.log('confirmation error');
					$state.transitionTo('resend confirmation email', { errors: data.errors });
				}
			});
		}	
	}
]);
