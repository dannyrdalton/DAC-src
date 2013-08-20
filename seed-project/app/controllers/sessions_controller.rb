class SessionsController < Devise::SessionsController
	def create
		self.resource = warden.authenticate!(auth_options)
    set_flash_message(:notice, :signed_in) if is_navigational_format?
    sign_in(resource_name, resource)
		render :json => { :user => current_user, :roles => current_user.roles }
	end

	def destroy
		signed_out = (Devise.sign_out_all_scopes ? sign_out : sign_out(resource_name))
    set_flash_message :notice, :signed_out if signed_out && is_navigational_format?
		render :json => { :success => true }
	end

	def failure
		render :json => { :success => false, :errors => ["Login Failed"] }
	end
end
