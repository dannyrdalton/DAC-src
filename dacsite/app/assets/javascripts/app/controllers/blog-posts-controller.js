app.controller('BlogPostCtrl', ['$scope', '$http', '$location', '$state', '$stateParams', '$cookieStore', 'BlogPost', 
	function($scope, $http, $location, $state, $stateParams, $cookieStore, BlogPost) {
		
		$scope.blogPosts = {};
		$scope.blogPost = {};
	
		//get blog posts	
		if ($state.current.name === 'blog') {
			$scope.blogPosts = BlogPost.query();
			BlogPost.currentPost = null;
		}
		
		//get individual blog posts
		if ($state.current.name === 'blog post' || $state.current.name === 'edit blog post') {
			if (!BlogPost.currentPost) {
				BlogPost.currentPost = $cookieStore.get('_dac_current_blog_post');
			}
			$scope.blogPost = BlogPost.currentPost;
			
			if ($state.current.name === 'edit blog post') {
				//convert tags from array to string for display in input
				var tagString = "";
				$scope.blogPost.tags.forEach( function(tag, index) {
					tagString += tag.name;
					if (index !== $scope.blogPost.tags.length - 1) tagString += ', ';
				});
				$scope.blogPost.tags = tagString;
			
			}
		}
		
		//get blog posts by a certain tag
		if ($state.current.name === 'blog post tag') {
			$http.get('/api/blog_posts/showTag?tagName=' + $stateParams.tagName)
			.success(function(data, status, headers, config) {
				$scope.blogPosts = data;
			});
		}
		
		//create blog post
		$scope.create = function() {
  		tags = $scope.blogPost.tags.split(', ');
			BlogPost.save({}, {
    		blog_post: {
					user_id: $scope.currentUser.id,
      		title: $scope.blogPost.title,
      		body: $scope.blogPost.body,
					tracks_attributes: {
						0: {
							link: $scope.blogPost.link
						}
					}
    		},
				tags: tags
  		}, function(response) {
   			$state.transitionTo('blog');
  		}, function(response) {
				console.log(response);
			});
		};

		//update blog post
		$scope.update = function() {
  		$http.put("/api/blog_posts/" + $scope.blogPost.id + '.json', {
    		blog_post: {
      		title: $scope.blogPost.title,
      		body: $scope.blogPost.body,
    		},
				tags: $scope.blogPost.tags
  		}).then((function(response) {
    		return $state.transitionTo('blog');
  		}), function(error) {});
		};
		
		//delete blog post
		$scope.destroy = function(id) {
  		return $http.delete('/api/blog_posts/' + id + '.json').then((function(response) {
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
			//parameterize title
			postUrl = blogPost.title.replace(/[^\w\s]/g, '').replace(/\s+/g, '-').toLowerCase();
			$state.transitionTo('blog post', { parameterizedTitle: postUrl });
		};
	}
]);
