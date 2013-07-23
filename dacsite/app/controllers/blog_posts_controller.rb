class BlogPostsController < ApplicationController
	
	def new
		@blogPost = BlogPost.new	
		@blogPost.tracks.build
	end
	
	def create
		@blogPost = BlogPost.create(blog_post_params)
		redirect_to :controller => "home", :action => "index"
	end

	private
	def blog_post_params
		params.require(:blog_post).permit(:title, :body, tracks_attributes: [:link])
	end
end
