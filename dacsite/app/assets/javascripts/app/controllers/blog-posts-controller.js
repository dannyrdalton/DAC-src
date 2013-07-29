app.controller('BlogPostCtrl', ['$scope', '$http', '$location', '$state', '$stateParams', 'BlogPost', 
	function($scope, $http, $location, $state, $stateParams, BlogPost) {
		$scope.blogPosts = {};
		$scope.blogPost = {};
	
		if ($state.current.name === 'blog') {
			$scope.blogPosts = BlogPost.query();
		}

		if ($state.current.name === 'edit') {
			$scope.task = BlogPost.get({ id: $stateParams['id'] });
  		//$http.get('/api/blog_posts' + $stateParams['id'] + '.json').then((function(response) {
    //		return $scope.task = response.data;
  	//	}), function(error) {});
		}

		$scope.create = function() {
  		return Task.save({}, {
    		blog_post: {
      		title: $scope.blogPost.title,
      		body: $scope.blogPost.body
    		}
  		}, function(response) {
   			return $location.path("/blog");
  		}, function(response) {});
		};

		$scope.update = function() {
  		return $http.put("/api/blog_posts/" + $scope.blogPost.id + '.json', {
    		blog_post: {
      		title: $scope.blogPost.title,
      		body: $scope.blogPost.body
    		}
  		}).then((function(response) {
    		return $location.path("/blog");
  		}), function(error) {});
		};
		
		$scope.destroy = function(id) {
  		return $http['delete']('/api/blog_posts/' + id + '.json').then((function(response) {
    		return $http.get('/api/blog_posts.json').then((function(response) {
      		return $scope.tasks = response.data;
    		}), function(error) {});
  		}), function(error) {});
		};
		
		return false;
	}
]);
