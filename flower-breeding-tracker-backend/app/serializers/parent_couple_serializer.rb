class ParentCoupleSerializer
  include FastJsonapi::ObjectSerializer
  attributes :parent_one, :parent_two
  has_many :flowers
end
