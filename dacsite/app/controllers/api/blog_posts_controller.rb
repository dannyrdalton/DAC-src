class Api::BlogPostsController < Api::BaseController

	def index
		respond_with :api, BlogPost.all.order("created_at DESC")
	end

	def show
		respond_with :api, BlogPost.find(params[:id])
	end

	def create
		blogPost = BlogPost.create(blog_post_params)
		respond_with :api, blogPost
	end

	def update
		respond_with :api, BlogPost.update(params[:id], params[:blog_post])
	end

	def destory
		respond_width :api, BlogPost.destroy(params[:id])
	end

	private
	def blog_post_params
    params.require(:blog_post).permit(:title, :body, :user_id, tracks_attributes: [:link])
  end
end
