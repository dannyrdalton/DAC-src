class CreateBlogPosts < ActiveRecord::Migration
  def change
    create_table :blog_posts do |t|
			t.column :user_id,					:string
			t.column :photo_file_name,	:string
			t.column :title,						:string
			t.column :body,						:string
			t.column :date_time,				:datetime
      t.timestamps
    end
  end
end
