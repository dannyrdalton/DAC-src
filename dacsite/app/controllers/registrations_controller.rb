class RegistrationsController < Devise::RegistrationsController
	def create
		build_resource(sign_up_params)

    if resource.save
			if resource.active_for_authentication?
        set_flash_message :notice, :signed_up if is_navigational_format?
        sign_up(resource_name, resource)
				logger.debug "resource is #{resource}"
        render :json => current_user.to_json
      else
        set_flash_message :notice, :"signed_up_but_#{resource.inactive_message}" if is_navigational_format?
        expire_session_data_after_sign_in!
        render :json => current_user.to_json
      end
    else
      clean_up_passwords resource
      respond_with resource
    end
	end
end
