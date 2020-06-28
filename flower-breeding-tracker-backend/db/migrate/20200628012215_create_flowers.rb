class CreateFlowers < ActiveRecord::Migration[6.0]
  def change
    create_table :flowers do |t|
      t.string :name
      t.string :status
      t.string :color
      t.string :origin 
      t.string :image_url

      t.timestamps
    end
  end
end
