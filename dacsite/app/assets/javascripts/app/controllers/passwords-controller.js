app.controller('PasswordCtrl', ['$scope', '$rootScope', '$http', '$state', '$stateParams', 'Session',
	function($scope, $rootScope, $http, $state, $stateParams, Session) {
		$scope.user = { email: "" };
		
		$scope.sendResetInstructions = function() {
			console.log('sending reset instructions');
			$http.post('/users/password', {
				'user': {
					'email': $scope.user.email
				}
			}).success(function(data, status, headers, config) {
				console.log(data);
				$state.transitionTo('login');
			});
		};

		if ($stateParams.resetToken) {
			$http.get('/users/password/edit?reset_password_token=' + $stateParams.resetToken)
			.success(function(data, status, headers, config) {
				console.log('edit success');
				console.log(data);
			});
		}

		$scope.resetPassword = function() {
			console.log('resetting password');
				
			$http.put('/users/password', {
				'user': {
					'reset_password_token': $stateParams.resetToken,
					'password': $scope.user.password,
					'password_confirmation': $scope.user.password_confirmation
				}
			}).success(function(data, status, headers, config) {
				console.log(data);
				Session.setUser(data);
				$rootScope.$broadcast('login', { success: true });
				$state.transitionTo('blog');
			});
		};	
	}
]);
