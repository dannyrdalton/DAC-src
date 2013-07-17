class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
			t.column :user_id,				:string
			t.column :blog_post_id,		:string
			t.column :date_time,			:datetime
			t.column :comment,				:string
      t.timestamps
    end
  end
end
