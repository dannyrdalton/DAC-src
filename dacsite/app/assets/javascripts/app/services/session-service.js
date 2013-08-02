app.service('Session', ['$rootScope', '$cookieStore', 'UserSession', 'UserRegistration',
	function($rootScope, $cookieStore, UserSession, UserRegistration) {
		this.currentUser = $cookieStore.get('_dac_user');
		
		this.signedIn = !!$cookieStore.get('_dac_user');
		
		//used for login
		this.userSession = new UserSession({ 'username': '', 'password': '', 'remember_me': false });
		
		//used for registration
		this.userRegistration = new UserRegistration({});

		this.login = function(userSession) {
			console.log('this.signedIn = ' + this.signedIn);
			if (!$cookieStore.get('_dac_user')) {
				userSession.$save()
				.success(function(data, status, headers, config) {
					data.user.roles = data.roles;
					data = data.user;
					$cookieStore.put('_dac_user',	data);
					console.log('user:');
					console.log($cookieStore.get('_dac_user'));
					this.signedIn = true;
					console.log('signedIn:');
					console.log(this.signedIn);
					this.userSession = new UserSession({ 'username': '', 'password': '', 'remember_me': false });
					$rootScope.$broadcast('login', { success: true });
				}).
				error(function(data, status, headers, config) {
					console.log('There was an error logging in');
					console.log(data);
					$rootScope.$broadcast('login', {success: false });
				});
			}
		};

		this.logout = function(userSession) {
			userSession.$destroy()
			.success(function() {
				$cookieStore.put('_dac_user', null);
				console.log($cookieStore.get('_dac_user'));
				$cookieStore.put('_dac_playlist', null);
				this.signedIn = false;
				console.log(this.signedIn);
				this.userSession = new UserSession({ 'username': '', 'password': '', 'remember_me': false });
				$rootScope.$broadcast('logout', { success: true });
			}).
			error(function() {
				$rootScope.$broadcast('logout', { success: false });
			});
		};

		this.register = function(userRegistration) {
			userRegistration.$save()
			.success(function(data, status, headers, config) {
				console.log('registration success');
				console.log(data);
				this.userRegistration = {};
				$rootScope.$broadcast('registration', { success: true });
			})
			.error(function(data, status, headers, config) {
				console.log('There was an error signing up.');
				console.log(data);
				$rootScope.$broadcast('registration', { success: false });
			});
		};
		
		//this function used for signing in after a password reset
		this.setUser = function(user) {
			this.signedIn = true;
			$cookieStore.put('_dac_user', user);
		};
	}
]);
