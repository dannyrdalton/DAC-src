app.controller('BlogPostCtrl', ['$scope', '$http', '$location', '$state', '$stateParams', '$cookieStore', 'BlogPost', 
	function($scope, $http, $location, $state, $stateParams, $cookieStore, BlogPost) {
		$scope.blogPosts = {};
		$scope.blogPost = {};
	
		if ($state.current.name === 'blog') {
			$scope.blogPosts = BlogPost.query();
			BlogPost.currentPost = null;
		}

		if ($state.current.name === 'blog post') {
			if (!BlogPost.currentPost) {
				$scope.blogPost = $cookieStore.get('_dac_current_blog_post');
			} else {
				$scope.blogPost = BlogPost.get({ id: BlogPost.currentPost.id });
			}
			console.log($scope.blogPost);
		}
		
		//create blog post
		$scope.create = function() {
  		return BlogPost.save({}, {
    		blog_post: {
					user_id: $scope.currentUser.id,
      		title: $scope.blogPost.title,
      		body: $scope.blogPost.body,
					tracks_attributes: {
						0: {
							link: $scope.blogPost.link
						}
					}
    		}
  		}, function(response) {
				console.log(response);
   			$state.transitionTo('blog');
  		}, function(response) {
				console.log(response);
			});
		};

		//update blog post
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
		
		//delete blog post
		$scope.destroy = function(id) {
  		return $http['delete']('/api/blog_posts/' + id + '.json').then((function(response) {
    		return $http.get('/api/blog_posts.json').then((function(response) {
      		return $scope.blogPosts = response.data;
    		}), function(error) {});
  		}), function(error) {});
		};
	
		//adds a blog post to a users list of 'liked' posts
		$scope.like = function(blogPost) {
			console.log(blogPost);
			$http.get('/api/blog_posts/' + blogPost.id + '/like.json')
			.success(function(data, status, headers, config) {
				console.log(data);
			});	
		};
	
		//navigates browser to the url for an individual blog post
		$scope.goToPageForPost = function(blogPost) {
			BlogPost.currentPost = blogPost;
			$cookieStore.put('_dac_current_blog_post', blogPost);	
			console.log($cookieStore.get('_dac_current_blog_post'));
			postUrl = blogPost.title.replace(/[^\w\s]/g, '').replace(/\s+/g, '-').toLowerCase();
			$state.transitionTo('blog post', { parameterizedTitle: postUrl });
		};
	}
]);
