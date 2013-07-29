class BlogPostSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :title, :body, :created_at
	has_many :tracks
end
