class CreateProfilePictures < ActiveRecord::Migration
  def change
    create_table :profile_pictures do |t|
			t.column :user_id,					:string
			t.column :file_name,				:string
      t.timestamps
    end
  end
end
