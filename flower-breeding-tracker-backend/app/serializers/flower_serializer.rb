class FlowerSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :status, :color, :origin, :image_url
  belongs_to :square
end
