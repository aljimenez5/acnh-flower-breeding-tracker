class RemoveAttributesFromFlowers < ActiveRecord::Migration[6.0]
  def change
    remove_column :flowers, :status, :string
    remove_column :squares, :flower_id, :integer
  end
end
