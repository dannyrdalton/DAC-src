app.run(['$rootScope', '$state', function($rootScope, $state) {
	$rootScope.transitionTo = function(stateName) {
		$state.transitionTo(stateName);
	};
}]);
