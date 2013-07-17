class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
			t.column :username,					:string
			t.column :first_name,				:string
			t.column :last_name,				:string
			t.column :gender,						:string
			t.column :dob								:datetime
			t.column :city,							:string
			t.column :state,						:string
			t.column :country,					:string
      t.column :admin_level				:integer
			t.timestamps
    end
  end
end
