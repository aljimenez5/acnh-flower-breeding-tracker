class RemoveForeignKeyFromFlowers < ActiveRecord::Migration[6.0]
  def change
    remove_column :flowers, :square_id, :integer
  end
end
