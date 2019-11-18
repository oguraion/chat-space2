Rails.application.routes.draw do
  devise_for :users, controllers: { omniauth_callbacks: 'users/omniauth_callbacks' }
  root 'groups#index'
  get "images/index" => "images#index"
  resources :users, only: [:index, :edit, :update]
  resources :groups, only: [:new, :create, :edit, :update, :index, ] do
    resources :messages, only: [:index, :create]
    namespace :api do 
      resources :messages, only: :index, defaults: { format: 'json' } 
    end
    end
  end