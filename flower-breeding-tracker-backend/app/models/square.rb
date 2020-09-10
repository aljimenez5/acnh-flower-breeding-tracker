class Square < ApplicationRecord
    belongs_to :land
    has_one :flower, optional: true

end