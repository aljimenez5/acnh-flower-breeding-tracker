class CreateSquares < ActiveRecord::Migration[6.0]
  def change
    create_table :squares do |t|
      t.integer :land_id
      t.integer :flower_id
      t.string :column_num
      t.string :row_num

      t.timestamps      
    end
  end
end
