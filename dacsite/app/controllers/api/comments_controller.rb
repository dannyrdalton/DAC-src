class Api::CommentsController < Api::BaseController
	
	def index
		comments = Comment.where(blog_post_id: params[:blog_post_id]).order("created_at DESC")
		commentsWithUsers = Array.new
		comments.each do |comment|
			commentsWithUsers << { :comment => comment, :username => comment.user.username }
		end
		respond_with :api, commentsWithUsers
	end

	def create
		comment = Comment.create(comment_params)
		respond_with :api, comment
	end

	private
	def comment_params
		params.require(:comment).permit(:user_id, :blog_post_id, :text)
	end		
end
