app.directive('dacAuthorized', ['$http', 'Session',
	function($http, Session) {
		return {
			restrict: 'A',
			link: function(scope, elem, attrs) {
				elem.css('display', 'none');
				if (Session.signedIn) {
					var allowedRoles = attrs.dacAuthorized.split(', ');
					Session.currentUser.roles.forEach(function(role) {
						if (allowedRoles.indexOf(role.name) !== -1) elem.css('display', 'block');
					});	
				}

				scope.$on('logout', function() {
					elem.css('display', 'none');
				});
			}
		}
	}
]);
