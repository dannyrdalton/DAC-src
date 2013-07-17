class BlogPost < ActiveRecord::Base
	belongs_to :user
	has_many :tracks
	has_many :comments
end
