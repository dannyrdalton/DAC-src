class CreateNotifications < ActiveRecord::Migration
  def change
    create_table :notifications do |t|
			t.belongs_to :user
			t.column :type,						:string
			t.column :body,						:string
			t.column :url,						:string
      t.timestamps
    end
  end
end
