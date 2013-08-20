app.service('Session', ['$rootScope', '$cookieStore', 'UserSession', 'UserRegistration',
	function($rootScope, $cookieStore, UserSession, UserRegistration) {
		
		self = this;
	
		this.currentUser = $cookieStore.get('_dac_user');
		
		this.signedIn = !!this.currentUser;
		
		//used for login, should be cleared after login
		this.userSession = new UserSession({ username: '', password: '', remember_me: false });
		
		//used for registration, should be cleared after registration 
		this.userRegistration = new UserRegistration({});

		
		this.login = function(userSession) {
			if (!$cookieStore.get('_dac_user')) {
				userSession.$save()
				.success(function(data, status, headers, config) {
					data.user.roles = data.roles;
					data = data.user;
					this.currentUser = data.user;
					$cookieStore.put('_dac_user',	data);
					this.signedIn = true;
					this.userSession = new UserSession({ username: '', password: '', remember_me: false });
					$rootScope.$broadcast('login', { success: true });
				}).
				error(function(data, status, headers, config) {
					$rootScope.$broadcast('login', { success: false, error: 'Invalid username or password.' });
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
				this.userSession = new UserSession({ username: '', password: '', remember_me: false });
				$rootScope.$broadcast('logout', { success: true });
			})
			.error(function() {
				$rootScope.$broadcast('logout', { success: false });
			});
		};

		this.register = function(userRegistration) {
			userRegistration.$save()
			.success(function(data, status, headers, config) {
				this.userRegistration = {};
				$rootScope.$broadcast('registration', data);
			})
			.error(function(data, status, headers, config) {
				console.log('There was an error signing up.');
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
