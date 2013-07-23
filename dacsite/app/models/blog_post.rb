class BlogPost < ActiveRecord::Base
	belongs_to :user
	has_many :tracks, :class_name => "Track"
	
	accepts_nested_attributes_for :tracks
end
