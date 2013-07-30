app.controller('CommentCtrl', ['$scope', '$state', '$http', 'Comment', 'BlogPost',
	function($scope, $state, $http, Comment, BlogPost) {
		$scope.comments = {};
		$scope.comment = {};	
	
		if($state.current.name = 'blog post') {
			$scope.comments = Comment.query({ blog_post_id: $scope.blogPost.id });
		}

		$scope.create = function() {
			Comment.save({}, {
				comment: {
					user_id: $scope.currentUser.id,
					blog_post_id: $scope.blogPost.id,
					text: $scope.comment.text
				}
			}, function(comment) {
				comment = { comment: comment, username: $scope.currentUser.username }
				$scope.comments.unshift(comment);
				console.log($scope.comments);
			});
		};
	}
]);
