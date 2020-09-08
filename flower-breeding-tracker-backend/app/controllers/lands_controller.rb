class LandsController < ApplicationController
    
    def index 
        lands = Land.all 
        render json: LandSerializer.new(lands)
    end

    def show 
        land = Land.find_by(id: params[:id])
        render json: LandSerializer.new(land)
    end

    def new
    end

    def create
        land = Land.find_by(id: params["land_id"])
        if !land 
            new_land = Land.create(land_params)

            new_land.number_of_columns.times do |i|
                new_land.number_of_rows.times do |ii|
                    new_square = Square.new(land_id: new_land.id, column_num: (i + 1).to_s)
                    new_square.row_num = (ii + 1).to_s 
                    new_square.save
                end
            end
            render json: LandSerializer.new(new_land)
        else
            render json: {status: 'error', message: "Land already exists"}
        end
        
    end

    def destroy
        land = Land.find_by(id: params["id"])
        land.delete
        render json: LandSerializer.new(land)
    end

    private

    def land_params
        params.require(:land).permit(:name, :location, :number_of_columns, :number_of_rows)

    end

end