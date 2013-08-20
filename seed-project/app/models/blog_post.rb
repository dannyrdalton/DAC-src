class BlogPost < ActiveRecord::Base
	belongs_to :user
	has_many :tracks, :class_name => "Track"
	has_many :blog_post_tags
	has_many :tags, :through => :blog_post_tags	
	has_many :user_likes
	has_many :likes, :through => :user_likes, :source => :user
	
	
	accepts_nested_attributes_for :tracks

	def addTag(tagName)
		tag = Tag.find_by_name(tagName)
		if tag
			self.tags << tag
		else 
			tag = Tag.new(:name => tagName)
			tag.save
			self.tags << tag
		end
		self.save
	end

end
