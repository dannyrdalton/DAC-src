class User < ActiveRecord::Base
	has_one :email
	has_one :password
	has_one :profile_picture
	has_many :blog_posts
	has_many :comments
	has_many :notifications	
	has_one :playlist
end
