Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'api/auth'
  namespace :api do
    resources :users, only: [:index, :show, :update] do
      resources :posts
    end
    resources :friends, only: [:index, :update, :destroy]
  end

  #Do not place any routes below this one
  get '*other', to: 'static#index'
end
