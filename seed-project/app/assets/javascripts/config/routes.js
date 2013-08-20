app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');
  return $stateProvider.state('default', {
    abstract: true,
    views: {
      "": {
        templateUrl: '/assets/layouts/default.html.erb'
      }
    }
  }).state('home', {
		parent: 'default',
		url: '/',
		views: {
			"": {
			}
		}
	}).state('login', {
		parent: 'default',
		url: '/login',
		views: {
			"": {
				controller: 'SessionCtrl',
				templateUrl: '/assets/sessions/new.html.erb'
			}
		}
	}).state('register', {
		parent: 'default',
		url: '/register',
		views: {
			"": {
				controller: 'RegistrationCtrl',
				templateUrl: '/assets/registrations/new.html.erb'
			}
		}
	}).state('register.success', {
		parent: 'default',
		url: '/registration-success',
		views: {
			"": {
					templateUrl: '/assets/registrations/success.html.erb'
			}
		}
	}).state('forgot password', {
		parent: 'default',
		url: '/forgot-password',
		views: {
			"": {
				controller: 'PasswordCtrl',
				templateUrl: '/assets/password/new.html.erb'
			}
		}
	}).state('reset password', {
		parent: 'default',
		url: '/reset-password/:resetToken',
		views: {
			"": {
				controller: 'PasswordCtrl',
				templateUrl: '/assets/password/edit.html.erb'
			}
		}
	}).state('resend confirmation email', {
		parent: 'default',
		url: '/resend-confirmation-email',
		views: {
			"": {
				controller: 'ConfirmationCtrl',
				templateUrl: '/assets/confirmations/new.html.erb'
			}
		}
	}).state('confirm email', {
		parent: 'default',
		url: '/confirm-email/:confirmationToken',
		views: {
			"": {
				controller: 'ConfirmationCtrl',
				template: " "
			}
		}
	});
}]);
