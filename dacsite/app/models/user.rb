class User < ActiveRecord::Base
  #devise modules
	devise :database_authenticatable, :token_authenticatable, :omniauthable, :confirmable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable, :lockable
	#associations
	has_many :blog_posts
	has_many :user_roles
	has_many :roles, :through => :user_roles
	
	#validations
	validates_presence_of :username
	validates_uniqueness_of :username
	
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
