class Flower < ApplicationRecord
    belongs_to :square
    belongs_to :land, through: :square
    

end