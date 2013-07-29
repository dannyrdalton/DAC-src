app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');
  return $stateProvider.state('default', {
    abstract: true,
    views: {
      "": {
        controller: 'AppCtrl',
        templateUrl: '/assets/layouts/default.html.erb'
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
	}).state('blog', {
		parent: 'default',
		url: '/blog',
		views: {
			"": {
				controller: 'BlogPostCtrl',
				templateUrl: '/assets/blog-posts/index.html.erb'
			}
		}
	});
}]);