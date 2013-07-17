class CreateNotifications < ActiveRecord::Migration
  def change
    create_table :notifications do |t|
			t.column :user_id,				:string
			t.column :type,						:string
			t.column :body,						:string
			t.column :url,						:string
      t.timestamps
    end
  end
end
