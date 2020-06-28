class Land < ApplicationRecord
    has_many :squares
    has_many :flowers, through: :squares
    

end