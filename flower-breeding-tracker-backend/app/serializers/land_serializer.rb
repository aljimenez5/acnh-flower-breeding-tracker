class LandSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :location, :number_of_columns, :number_of_rows
  has_many :squares
  has_many :flowers, through: :squares
end
