class UserLike < ActiveRecord::Base
	belongs_to :user
	belongs_to :blog_post

end
