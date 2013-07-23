class BlogPostsController < ApplicationController
	
	def index
		@blogPosts = BlogPost.all
	end
		
	def new
		@blogPost = BlogPost.new	
		@blogPost.tracks.build
	end
	
	def create
		@blogPost = BlogPost.create(blog_post_params)
		redirect_to :action => "index"
	end

	private
	def blog_post_params
		params.require(:blog_post).permit(:title, :body, :user_id, tracks_attributes: [:link])
	end
end
