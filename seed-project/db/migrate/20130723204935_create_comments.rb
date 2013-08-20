class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
			t.belongs_to :user
			t.belongs_to :blog_post
			t.string :text
      t.timestamps
    end
  end
end
