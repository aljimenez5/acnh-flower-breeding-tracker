class FlowerSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :color, :origin, :image_url

end
