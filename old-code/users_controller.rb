class UsersController < ApplicationController

	def new
		@user = User.new
		@user.build_email
	end

	def create
		if @user = User.create(user_params)
			logger.debug "#{@user.errors.messages}"
			logger.debug "params: #{params}"
			redirect_to :action => "new"
		else
			logger.debug "#{@user.errors.messages}"
			logger.flush
			redirect_to :action => "new"
		end
	end

	private
		def user_params
			params.require(:user).permit(:username, :password, :password_confirmation, :first_name, :last_name, :gender, :dob, :city, :state, :country, :admin_level, email_attributes: [:email])
		end

end
