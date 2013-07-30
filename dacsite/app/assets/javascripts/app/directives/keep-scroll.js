app.directive('ngKeepScroll', function ($timeout) {
	return function (scope, element, attrs) {
    //load scroll position after everything has rendered
  	$timeout(function () {
    	var scrollY = parseInt(scope.$eval(attrs.ngKeepScroll));
     	$(window).scrollTop(scrollY ? scrollY : 0);
   	}, 0);
        
   	//save scroll position on change
   	scope.$on("$routeChangeStart", function () {
    	scope.$eval(attrs.ngKeepScroll + " = " + $(window).scrollTop());
    });
 	}
});
