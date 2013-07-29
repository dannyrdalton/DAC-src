class PasswordsController < Devise::PasswordsController
	def new
		super
	end
	
	def create
		self.resource = resource_class.send_reset_password_instructions(resource_params)
    if successfully_sent?(resource)
      render :json => { :success => true }
    else
      render :json => { :success => false }
    end
	end

	def edit
		self.resource = resource_class.new
		resource.reset_password_token = params[:reset_password_token]
		render :json => resource.to_json
	end

	def update
		 	self.resource = resource_class.reset_password_by_token(resource_params)
			byebug
			if resource.errors.empty?
      	resource.unlock_access! if unlockable?(resource)
      	flash_message = resource.active_for_authentication? ? :updated : :updated_not_active
      	set_flash_message(:notice, flash_message) if is_navigational_format?
      	sign_in(resource_name, resource)
      	render :json => resource
    	else
      	render :json => resource.errors
    end
	end
end
