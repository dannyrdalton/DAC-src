class CommentsControllerController < ApplicationController
	def new
		@comment = Comment.new
	end

end
