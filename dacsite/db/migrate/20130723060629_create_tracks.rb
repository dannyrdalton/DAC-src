class CreateTracks < ActiveRecord::Migration
  def change
    create_table :tracks do |t|
			t.belongs_to :blog_post
			t.string :title
			t.string :artist
			t.string :url
			t.string :artwork_url
			t.string :track_id
      t.timestamps
    end
  end
end
