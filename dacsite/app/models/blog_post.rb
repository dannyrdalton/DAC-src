class BlogPost < ActiveRecord::Base
	belongs_to :user
	has_many :tracks, :class_name => "Track"
	has_many :blog_post_tags
	has_many :tags, :through => :blog_post_tags	
	has_many :user_likes
	has_many :likes, :through => :user_likes, :source => :user
	
	
	accepts_nested_attributes_for :tracks
end
