class SquareSerializer
  include FastJsonapi::ObjectSerializer
  attributes :column_num, :row_num, :flower
  has_one :flower
  belongs_to :land
end
