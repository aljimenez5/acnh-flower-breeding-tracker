class StaticFlower < ApplicationRecord
    validates :image_url, uniqueness: true
end
