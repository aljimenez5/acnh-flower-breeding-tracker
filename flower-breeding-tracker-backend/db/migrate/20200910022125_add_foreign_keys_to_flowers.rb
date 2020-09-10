class AddForeignKeysToFlowers < ActiveRecord::Migration[6.0]
  def change
    add_column :flowers, :square_id, :integer
    add_column :flowers, :parent_couple_id, :integer
  end
end
