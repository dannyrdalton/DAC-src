class Api::PlaylistsController < Api::BaseController
	def show
		playlist = Playlist.find(params[:id]).attributes
		respond_with :api, playlist 
	end

	def update
		playlist = Playlist.find(params[:id])
		playlist.playlist = params[:playlist].to_json
		playlist.save
		respond_with :api, { :success => true }
	end
end
