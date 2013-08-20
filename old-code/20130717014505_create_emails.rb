class CreateEmails < ActiveRecord::Migration
  def change
    create_table :emails do |t|
			t.belongs_to :user
			t.string :email, :unique => true
      t.timestamps
    end
  end
end
