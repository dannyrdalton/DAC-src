class Track < ActiveRecord::Base
	belongs_to :blog_post
	
	#soundcloud client object
	
	def link
		return self.url
	end

	def link=(url)
		self.url = url
		client = Soundcloud.new(:client_id => 'f116577ada558b6ab3ddc756e60cbc71')	
		track = client.get('/resolve', :url => url)
		self.track_id = track.id
		logger.debug "track id is #{track.id}"
	end
end
