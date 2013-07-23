class User < ActiveRecord::Base
  #devise modules
	devise :database_authenticatable, :token_authenticatable, :omniauthable, :confirmable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable, :lockable
	
	#associations
	has_many :blog_posts
	has_and_belongs_to_many :roles

	#validations
	validates_presence_of :username
	validates_uniqueness_of :username

	def has_role?(role_sym)
		roles.any? { |r| r.name.underscore.to_sym == role_sym }
	end
end
