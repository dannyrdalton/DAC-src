app.run(['$rootScope', '$location', '$anchorScroll', '$routeParams',
  function ($rootScope, $location, $anchorScroll, $routeParams) {
  $rootScope.$on('$stateChangeSuccess', function () {
		console.log($routeParams.scrollTo);
    $location.hash($routeParams.scrollTo);
    $anchorScroll();

  });
}]);
