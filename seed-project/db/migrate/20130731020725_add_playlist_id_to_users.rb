class AddPlaylistIdToUsers < ActiveRecord::Migration
  def change
  	add_column :users, :playlist_id, :string
	end
end
