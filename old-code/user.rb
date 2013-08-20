class User < ActiveRecord::Base
	has_one :email
	has_one :profile_picture
	has_many :blog_posts
	has_many :comments
	has_many :notifications	
	has_one :playlist
	
	validates_presence_of :username, :email, :password	

	validates_confirmation_of :password, :on => :create

	accepts_nested_attributes_for :email

	def password_valid?(candidatePass)
 		candidatePassAndSalt = "#{candidatePass}#{self.salt}"
  	candidatePasswordDigest = Digest::SHA1.hexdigest(candidatePassAndSalt)
  	if (candidatePasswordDigest == self.password_digest)
  		return true
  	else 
  		return false
  	end
  end

  def password
  end

  def password=(text)
  	self.salt = Random.new.rand
  	passAndSalt = "#{text}#{self.salt}"
 		self.password_digest = Digest::SHA1.hexdigest(passAndSalt)
  end
end
