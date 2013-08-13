Dacsite::Application.routes.draw do
 	root :to => 'home#index'
	devise_for :users, :path_names => { :sign_up => "register", :sign_in => "login", :sign_out => "logout" }, :controllers => { :sessions => "sessions", :registrations => "registrations", :passwords => "passwords", :confirmations => "confirmations" }
	
	namespace :api do
		resources :blog_posts do
			member do
				get 'like'
			end
			collection do
				get 'showTag'
			end
		end
		resources :comments
		resources :playlists
	end
	
	resources :blog_posts
	resources :comments
	
	match '/login' => 'home#index', via: [:get]
	match '/register' => 'home#index', via: [:get]
	match '/forgot-password' => 'home#index', via: [:get]
	match '/reset-password' => 'home#index', via: [:get]
	match '/reset-password/*page' => 'home#index', via: [:get]
	match '/resend-confirmation-email' => 'home#index', via: [:get]
	match '/confirm-email/*page' => 'home#index', via: [:get]

	match '/blog' => 'home#index', via: [:get]
	match	'/blog/*page' => 'home#index', via: [:get]
	match '/new-blog-post' => 'home#index', via: [:get]	
	# The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".
	# get 'blog' => 'blog_posts#index'
  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end
  
  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
