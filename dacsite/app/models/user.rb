class User < ActiveRecord::Base
  #devise modules
	devise :database_authenticatable, :token_authenticatable, :omniauthable, :confirmable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable, :lockable
	#associations
	has_many :blog_posts
	
	#validations
	validates_presence_of :username
	validates_uniqueness_of :username
end
