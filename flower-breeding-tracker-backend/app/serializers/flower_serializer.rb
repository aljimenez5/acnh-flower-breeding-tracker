class FlowerSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :color, :origin, :image_url
  belongs_to :parent_couple
end
