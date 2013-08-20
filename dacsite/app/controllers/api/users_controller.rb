class Api::UsersController < Api::BaseController

	def authorize
		authorized = false;
		current_user.roles.each do |role|
			authorized = true if role.name == "admin"
		end
		render :json => { authorized: authorized }
	end

end
