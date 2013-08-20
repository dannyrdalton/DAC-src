class Playlist < AWS::Record::HashModel
	integer_attr :user_id
	string_attr :playlist
	timestamps
end
