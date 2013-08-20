class ConfirmationsController < Devise::ConfirmationsController
	# POST /users/confirmation
	def create
		self.resource = resource_class.new
		self.resource = resource_class.send_confirmation_instructions(resource_params)

		if successfully_sent?(resource)
    	render :json => { :success => true }
		else
      render :json => { :success => false, :errors => resource.errors }
    end
	end

	# GET /users/confirmation?confirmation_token=abcdef
	def show
		self.resource = resource_class.confirm_by_token(params[:confirmation_token])
		
		if resource.errors.empty?
      set_flash_message(:notice, :confirmed) if is_navigational_format?
      sign_in(resource_name, resource)
    	render :json => { :success => true, :resource => resource }
		else
    	render :json => { :success => true, :errors => resource.errors }
		end
	end
end
