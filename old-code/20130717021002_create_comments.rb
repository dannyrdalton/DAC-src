class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
			t.belongs_to :user
			t.belongs_to :blog_post
			t.column :date_time,			:datetime
			t.column :comment,				:string
      t.timestamps
    end
  end
end
