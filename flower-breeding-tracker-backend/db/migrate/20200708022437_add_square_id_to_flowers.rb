class AddSquareIdToFlowers < ActiveRecord::Migration[6.0]
  def change
    add_column :flowers, :square_id, :integer
  end
end
