Rails.application.routes.draw do
  root 'flowers#index'
  resources :flowers
  resources :lands
  resources :squares, :only => [:index, :show]
end
