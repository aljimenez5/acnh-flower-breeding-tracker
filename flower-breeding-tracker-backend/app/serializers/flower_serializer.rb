class FlowerSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :color, :origin, :image_url
  belongs_to :parent_couple, optional: true
  belongs_to :square, optional: true
end
