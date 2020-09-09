class CreateParentCouples < ActiveRecord::Migration[6.0]
  def change
    create_table :parent_couples do |t|
      t.integer :parent_one
      t.integer :parent_two
      t.timestamps
    end
  end
end
