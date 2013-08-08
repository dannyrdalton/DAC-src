class CreateUserLikes < ActiveRecord::Migration
  def change
    create_table :user_likes do |t|
			t.belongs_to :user
			t.belongs_to :blog_post
      t.timestamps
    end
  end
end
