class SquareSerializer
  include FastJsonapi::ObjectSerializer
  attributes :column_num, :row_num
  has_one :flower, optional: true
  belongs_to :land
end
