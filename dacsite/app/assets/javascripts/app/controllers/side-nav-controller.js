app.controller('SideNavCtrl', ['$scope', '$location',
	function($scope, $location) {
		$scope.isActiveTab = function(pathName) {
      if ($location.path().substr(0, pathName.length) == pathName) return "active";
		};
	}
]);
