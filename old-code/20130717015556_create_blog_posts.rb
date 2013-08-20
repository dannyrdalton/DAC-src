class CreateBlogPosts < ActiveRecord::Migration
  def change
    create_table :blog_posts do |t|
			t.belongs_to :user
			t.column :photo_file_name,	:string
			t.column :title,						:string
			t.column :body,						:string
			t.column :date_time,				:datetime
      t.timestamps
    end
  end
end
