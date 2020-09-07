class FlowerSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :status, :color, :origin, :image_url
end
