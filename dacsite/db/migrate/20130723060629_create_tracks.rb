class CreateTracks < ActiveRecord::Migration
  def change
    create_table :tracks do |t|
			t.belongs_to :blog_post
			t.string :url
			t.string :track_id
      t.timestamps
    end
  end
end
