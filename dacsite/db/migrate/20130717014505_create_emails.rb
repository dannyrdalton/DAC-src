class CreateEmails < ActiveRecord::Migration
  def change
    create_table :emails do |t|
			t.column :user_id,			:string
			t.column :email,				:string
      t.timestamps
    end
  end
end
