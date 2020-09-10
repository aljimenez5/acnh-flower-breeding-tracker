class Flower < ApplicationRecord
    belongs_to :parent_couple, optional: true
    belongs_to :square, optional: true
    
end