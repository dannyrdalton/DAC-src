class RegistrationsController < Devise::RegistrationsController
	def create
		build_resource(sign_up_params)
    if resource.save
			playlist = Playlist.create(:user_id => resource.id)
			resource.playlist_id = playlist.id
			resource.save
			if resource.active_for_authentication?
        set_flash_message :notice, :signed_up if is_navigational_format?
        sign_up(resource_name, resource)
				logger.debug "resource is #{resource}"
        render :json => { :success => true }
      else
        set_flash_message :notice, :"signed_up_but_#{resource.inactive_message}" if is_navigational_format?
        expire_session_data_after_sign_in!
        render :json => { :success => true }
      end
  	else
			clean_up_passwords resource
      render :json => { :success => false, :messages => resource.errors.messages }
    end
	end
end
