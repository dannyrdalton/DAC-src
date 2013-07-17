class CreateTracks < ActiveRecord::Migration
  def change
    create_table :tracks do |t|
			t.column :blog_post_id,		:string
			t.column :playlist_id,		:string
			t.column :soundcloud_url,	:string
      t.timestamps
    end
  end
end
