app.run(function($rootScope, $state, $stateParams) {
  // You can turn this off on production.
	$rootScope.$debugMode = "on";
  
	// Capture current state and stateParams, this variable can be showed
	// in browser for debug purpose.
	$rootScope.$state = $state;
  return $rootScope.$stateParams = $stateParams;
});
