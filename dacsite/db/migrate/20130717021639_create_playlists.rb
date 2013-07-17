class CreatePlaylists < ActiveRecord::Migration
  def change
    create_table :playlists do |t|
			t.column :user_id,				:string
      t.timestamps
    end
  end
end
