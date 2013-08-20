class Api::BlogPostsController < Api::BaseController

	def index
		respond_with :api, BlogPost.all.order("created_at DESC")
	end

	def show
		respond_with :api, BlogPost.find(params[:id])
	end

	def showTag
		respond_with :api, BlogPost.joins(:tags).where("tags.name" => params[:tagName])
	end

	def create
		blogPost = BlogPost.create(blog_post_params)
		params[:tags].each do |tag|
			blogPost.addTag(tag)
		end
		respond_with :api, blogPost
	end

	def update
		respond_with :api, BlogPost.update(params[:id], blog_post_params)
	end

	def destory
		respond_with :api, BlogPost.destroy(params[:id])
	end

	def like
		liked = current_user.already_liked_blog_post(params[:id])
		if !liked
			blogPost = BlogPost.find(params[:id])
			current_user.likes << blogPost
			render :json => { :success => true }
		else
			render :json => { :success => false }
		end
	end

	private
	def blog_post_params
    params.require(:blog_post).permit(:title, :body, :user_id, tracks_attributes: [:link])
  end
end
