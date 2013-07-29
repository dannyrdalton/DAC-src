class Api::BlogPostsController < Api::BaseController

	def index
		respond_with :api, BlogPost.all
	end

	def show
		respond_with :api, BlogPost.find(params[:id])
	end

	def create
		respond_with :api, BlogPost.create(params[:blog_post])
	end

	def update
		respond_with :api, BlogPost.update(params[:id], params[:blog_post])
	end

	def destory
		respond_width :api, BlogPost.destroy(params[:id])
	end
end
