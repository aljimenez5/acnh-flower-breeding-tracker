class CreateLands < ActiveRecord::Migration[6.0]
  def change
    create_table :lands do |t|
      t.string :name
      t.string :location 
      t.integer :number_of_columns
      t.integer :number_of_rows

      t.timestamps
    end
  end
end
