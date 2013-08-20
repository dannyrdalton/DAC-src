class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
			t.string :username, :unique => true
			t.string :password_digest
			t.string :salt
			t.string :first_name
			t.string :last_name
			t.string :gender
			t.datetime :dob
			t.string :city
			t.string :state
			t.string :country
      t.integer :admin_level
			t.timestamps
    end
  end
end
