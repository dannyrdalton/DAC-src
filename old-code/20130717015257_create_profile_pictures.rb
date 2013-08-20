class CreateProfilePictures < ActiveRecord::Migration
  def change
    create_table :profile_pictures do |t|
			t.belongs_to :user
			t.column :file_name,				:string
      t.timestamps
    end
  end
end
