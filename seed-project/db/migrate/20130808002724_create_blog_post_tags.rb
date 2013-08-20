class CreateBlogPostTags < ActiveRecord::Migration
  def change
    create_table :blog_post_tags do |t|
			t.belongs_to :blog_post
			t.belongs_to :tag
      t.timestamps
    end
  end
end
