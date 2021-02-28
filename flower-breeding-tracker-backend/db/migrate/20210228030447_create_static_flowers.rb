class CreateStaticFlowers < ActiveRecord::Migration[6.0]
  def change
    create_table :static_flowers do |t|
      t.string :name
      t.string :color
      t.string :image_url
      t.timestamps
    end
  end
end
