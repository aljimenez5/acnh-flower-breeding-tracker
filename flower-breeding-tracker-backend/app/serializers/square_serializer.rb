class SquareSerializer
  include FastJsonapi::ObjectSerializer
  attributes :column_num, :row_num
  belongs_to :land
end
