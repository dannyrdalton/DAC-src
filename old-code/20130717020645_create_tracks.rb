class CreateTracks < ActiveRecord::Migration
  def change
    create_table :tracks do |t|
			t.belongs_to :blog_post
			t.belongs_to :playlist
			t.column :soundcloud_url,	:string
      t.timestamps
    end
  end
end
