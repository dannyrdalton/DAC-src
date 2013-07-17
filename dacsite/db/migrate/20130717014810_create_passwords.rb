class CreatePasswords < ActiveRecord::Migration
  def change
    create_table :passwords do |t|
			t.column :user_id,					:string
			t.column :password_digest,	:string
			t.column :salt,							:string
      t.timestamps
    end
  end
end
