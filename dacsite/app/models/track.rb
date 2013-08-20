class Track < ActiveRecord::Base
	belongs_to :blog_post
	
	def link
		return self.url
	end

	def link=(url)
		self.url = url
		client = Soundcloud.new(:client_id => 'f116577ada558b6ab3ddc756e60cbc71')	
		track = client.get('/resolve', :url => url)
		self.track_id = track.id
		self.title = track.title
		self.artist = track.user.username
		logger.debug "track artwork url is #{track.artwork_url}"
		logger.debug "track stream url is #{track.stream_url}"
		if track.artwork_url
			self.artwork_url = track.artwork_url
			self.artwork_url["large"] = "t500x500"
		else
			self.artwork_url = "none"
		end
		
	end
end
