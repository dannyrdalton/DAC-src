class User < ActiveRecord::Base
  #devise modules
	devise :database_authenticatable, :token_authenticatable, :omniauthable, :confirmable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable, :lockable
	
	#associations
	has_many :user_roles
	has_many :roles, :through => :user_roles
	has_many :blog_posts
	has_many :user_likes
	has_many :likes, :through => :user_likes, :source => :blog_post
 	
	#validations
	validates_presence_of :username
	validates_uniqueness_of :username
	
	def already_liked_blog_post(blog_post_id)
		self.likes.each do |like|
			return true if like.id == blog_post_id.to_i
		end
		return false
	end
	
	def add_role(role_sym)
		role = Role.find_by_name(role_sym.to_s)
		if !role
			role = Role.new(:name => role_sym.to_s)
			role.save
		end
		self.roles << role
		self.save	
	end

	def has_role?(role_sym)
  	roles.any? { |r| r.name.underscore.to_sym == role_sym }
	end

end
