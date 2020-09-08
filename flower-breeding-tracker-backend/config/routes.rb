Rails.application.routes.draw do
  resources :flowers
  resources :lands
  resources :squares, :only => [:index, :show]
end
